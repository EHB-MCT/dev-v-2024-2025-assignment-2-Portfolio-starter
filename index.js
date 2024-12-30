require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const getWeatherData = require('./scraping/getWeatherData');
const saveWeatherData = require('./database/saveWeatherData'); // Import your saveWeatherData function

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
        mongoose.connection.close();
    }
};

// Main Function
const main = async () => {
    await connectDB();
    await scrapeAndSaveWeatherData();
};

// Start the script
main();
