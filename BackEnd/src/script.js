const express = require('express');
const cors = require('cors');
const {
    MongoClient,
} = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

const client = new MongoClient("mongodb+srv://barrybbeeebenson:2025Bitch@cluster0.eocdgpz.mongodb.net/?retryWrites=true&w=majority");

app.use(cors());
app.use(express.json())

/*Get all smiskis*/
app.get('/api/data', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('JustLilGuys');
        const collection = database.collection('Smiskis');

        const data = await collection.find({}).toArray();

        res.json(data);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    } finally {
        await client.close();
    }
});

/*Get a specific series*/
app.get('/api/:series', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('JustLilGuys');
        const collection = database.collection('Smiskis');

        const seriesName = req.params.series;

        const series = await collection.find({
            series: seriesName
        }).toArray();

        if (!series) {
            res.status(404).json({
                error: 'series not found'
            });
            return;
        }

        res.json(series);
    } catch (error) {
        console.error('Error fetching series:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    } finally {
        await client.close();
    }
});


/* Get all series names */
app.get('/api/series', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('JustLilGuys');
        const collection = database.collection('Smiskis');


        // Use distinct to get all unique series names
        const seriesNames = await collection.distinct('name');

        const collections = await database.listCollections().toArray();
        console.log(collections);

        res.json(seriesNames);
    } catch (error) {
        console.error('Error fetching series names:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    } finally {
        await client.close();
    }
});




/* Switch the inCollection boolean using the name */
app.patch('/api/toggleInCollection/:name', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('JustLilGuys');
        const collection = database.collection('Smiskis');

        const smiskiName = req.params.name;
        

        const result = await collection.findOneAndUpdate(
            { name: smiskiName },
            [{ $set: { inCollection: { $not: "$inCollection" } } }], 
            { returnDocument: 'after' } 
        );

        if (!result.value) {
            res.status(404).json({ error: 'Smiski not found' });
            return;
        }

        res.json(result.value);
    } catch (error) {
        console.error('Error toggling inCollection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});


/* Get the collection completion percentage for a specific series */
app.get('/api/collectionCompletion/:series', async (req, res) => {
    const seriesName = decodeURIComponent(req.params.series);

    try {
        await client.connect();
        const database = client.db('JustLilGuys');
        const collection = database.collection('Smiskis');

        // Debugging logs
        console.log("Requested series:", seriesName);

        // Find all Smiskis in the series
        const totalSmiskis = await collection.countDocuments({ series: seriesName });
        const smiskisInCollection = await collection.countDocuments({
            series: seriesName,
            inCollection: true
        });

        // Log retrieved counts
        console.log(`Total Smiskis for ${seriesName}:`, totalSmiskis);
        console.log(`Smiskis in collection for ${seriesName}:`, smiskisInCollection);

        // Calculate the percentage
        const completionPercentage = totalSmiskis
            ? (smiskisInCollection / totalSmiskis) * 100
            : 0;

        console.log("Completion Percentage:", completionPercentage); // Log to confirm

        // Respond with the percentage
        res.json({ completionPercentage });
    } catch (error) {
        console.error('Error fetching collection completion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});




/* storing the selected store*/
app.post('/api/storeChoice', async (req, res) => {
    const { series, store } = req.body;

    if (!series || !store) {
        res.status(400).json({ error: 'Series and store are required.' });
        return;
    }

    try {
        await client.connect();
        const database = client.db('JustLilGuys');
        const collection = database.collection('StoreChoices');

       
        await collection.insertOne({ series, store });

        res.status(200).json({ message: 'Store choice recorded successfully.' });
    } catch (error) {
        console.error('Error recording store choice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});



/* Get the most common store for a series */
app.get('/api/mostCommonStore/:series', async (req, res) => {
    const seriesName = req.params.series;

    try {
        await client.connect();
        const database = client.db('JustLilGuys');
        const collection = database.collection('StoreChoices');

        // Find all store choices for the given series
        const storeChoices = await collection.find({ series: seriesName }).toArray();

        if (storeChoices.length === 0) {
            res.json({ mostCommonStore: 'Unknown' });
            return;
        }

        // Count the occurrences of each store
        const storeCount = storeChoices.reduce((acc, choice) => {
            const store = choice.store;
            if (store) {
                acc[store] = (acc[store] || 0) + 1;
            }
            return acc;
        }, {});

        // Determine the most common store
        const mostCommonStore = Object.entries(storeCount).reduce(
            (maxStore, [store, count]) => (count > maxStore.count ? { store, count } : maxStore),
            { store: null, count: 0 }
        );

        res.json({ mostCommonStore: mostCommonStore.store });
    } catch (error) {
        console.error('Error fetching most common store:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});




app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`);
});


