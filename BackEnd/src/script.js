const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI; // MongoDB connection string from environment variables
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

app.use(cors());
app.use(express.json());

// Connect to MongoDB and initialize the db object
async function connectToDB() {
    try {
        if (!db) {
            await client.connect();
            db = client.db('JustLilGuys');
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Reusable function to get the Smiskis collection
function getSmiskisCollection() {
    return db.collection('Smiskis');
}

// Get all smiskis
app.get('/api/data', async (req, res) => {
    try {
        await connectToDB();
        const collection = getSmiskisCollection();
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific series
app.get('/api/:series', async (req, res) => {
    try {
        await connectToDB();
        const collection = getSmiskisCollection();
        const seriesName = req.params.series;

        const series = await collection.find({ series: seriesName }).toArray();

        if (series.length === 0) {
            return res.status(404).json({ error: 'Series not found' });
        }

        res.json(series);
    } catch (error) {
        console.error('Error fetching series:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Toggle inCollection boolean
app.patch('/api/toggleInCollection/:name', async (req, res) => {
    try {
        await connectToDB();
        const collection = getSmiskisCollection();
        const smiskiName = req.params.name;

        const result = await collection.findOneAndUpdate(
            { name: smiskiName },
            [{ $set: { inCollection: { $not: "$inCollection" } } }],
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return res.status(404).json({ error: 'Smiski not found' });
        }

        res.json(result.value);
    } catch (error) {
        console.error('Error toggling inCollection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get collection completion percentage
app.get('/api/collectionCompletion/:series', async (req, res) => {
    const seriesName = decodeURIComponent(req.params.series);

    try {
        await connectToDB();
        const collection = getSmiskisCollection();

        const totalSmiskis = await collection.countDocuments({ series: seriesName });
        const smiskisInCollection = await collection.countDocuments({
            series: seriesName,
            inCollection: true
        });

        const completionPercentage = totalSmiskis ? (smiskisInCollection / totalSmiskis) * 100 : 0;

        res.json({ completionPercentage });
    } catch (error) {
        console.error('Error fetching collection completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Store user's selected store for a series
app.post('/api/storeChoice', async (req, res) => {
    const { series, store } = req.body;

    if (!series || !store) {
        return res.status(400).json({ error: 'Series and store are required.' });
    }

    try {
        await connectToDB();
        const storeCollection = db.collection('StoreChoices');
        await storeCollection.insertOne({ series, store });
        res.status(200).json({ message: 'Store choice recorded successfully.' });
    } catch (error) {
        console.error('Error recording store choice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get most common store for a series
app.get('/api/mostCommonStore/:series', async (req, res) => {
    const seriesName = req.params.series;

    try {
        await connectToDB();
        const collection = db.collection('StoreChoices');
        const storeChoices = await collection.find({ series: seriesName }).toArray();

        if (storeChoices.length === 0) {
            return res.json({ mostCommonStore: 'Unknown' });
        }

        const storeCount = storeChoices.reduce((acc, choice) => {
            acc[choice.store] = (acc[choice.store] || 0) + 1;
            return acc;
        }, {});

        const mostCommonStore = Object.entries(storeCount).reduce(
            (maxStore, [store, count]) => (count > maxStore.count ? { store, count } : maxStore),
            { store: null, count: 0 }
        );

        res.json({ mostCommonStore: mostCommonStore.store });
    } catch (error) {
        console.error('Error fetching most common store:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle server shutdown and MongoDB disconnection
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
