// server/server.js

const express = require('express');
const path = require('path'); // To serve static files
const WeatherData = require('../models/weatherData'); // Import the WeatherData model

// Initialize Express app
const app = express();

// Middleware for handling JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// API Route for fetching weather data
app.get('/api/weather-data', async (req, res) => {
    try {
        const data = await WeatherData.find(); // Fetch data from MongoDB
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching weather data in /api/weather-data' });
    }
});

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the Express server
const startServer = () => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
};

module.exports = startServer;
