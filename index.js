require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const getWeatherData = require('./scraping/getWeatherData');
const saveWeatherData = require('./database/saveWeatherData'); // Import your saveWeatherData function
const WeatherData = require('./models/weatherData'); // Import your WeatherData model
const path = require('path'); // To serve static files

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

// Initialize Express app
const app = express();

// Middleware for handling JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Scrape and Save Data
const scrapeAndSaveWeatherData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
        const url = 'https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759';
        const weatherData = await getWeatherData(page, url);
        console.log('Scraped Weather Data:', weatherData);
        
        // Save to MongoDB using the saveWeatherData function
        await saveWeatherData(weatherData);

        console.log('Weather data successfully scraped and saved to database');
    } catch (err) {
        console.error('Error scraping and saving weather data:', err);
    } finally {
        await browser.close();
    }
};

// Main Function to start app and connect DB
const main = async () => {
    await connectDB(); // Ensure DB connection before starting the app
    await scrapeAndSaveWeatherData(); // Optionally, you can run this on an interval or a schedule
    startServer();
};

// Start the Express server
const startServer = () => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
};

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
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the app
main(); // This will start both the DB connection and server
