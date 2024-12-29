const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://robbedeclerck:rIj8hneSyDRGYqNi@weatherdatacluster.bbhmg.mongodb.net/?retryWrites=true&w=majority&appName=WeatherDataCluster";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('weatherData'); // Replace with your database name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

function getDatabase() {
    if (!db) {
        throw new Error('Database connection not initialized. Call connectToDatabase first.');
    }
    return db;
}

module.exports = { connectToDatabase, getDatabase };
