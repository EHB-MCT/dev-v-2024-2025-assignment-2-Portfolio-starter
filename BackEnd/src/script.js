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
        const seriesNames = await collection.distinct('series');

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








app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`);
});


