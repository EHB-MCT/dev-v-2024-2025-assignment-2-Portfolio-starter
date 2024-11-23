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

app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`);
});