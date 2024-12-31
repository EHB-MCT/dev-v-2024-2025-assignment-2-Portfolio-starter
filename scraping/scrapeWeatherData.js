// scraping/scrapeWeatherData.js

const puppeteer = require('puppeteer');
const getWeatherData = require('./getWeatherData'); // Import your scraping helper
const saveWeatherData = require('../database/saveWeatherData'); // Import the function to save weather data to DB

const scrapeAndSaveWeatherData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
        const url = 'https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759';
        const weatherData = await getWeatherData(page, url);
        //console.log('Scraped Weather Data:', weatherData);
        
        // Save to MongoDB using the saveWeatherData function
        await saveWeatherData(weatherData);

        console.log('Weather data successfully scraped and saved to database');
    } catch (err) {
        console.error('Error scraping and saving weather data:', err);
    } finally {
        await browser.close();
    }
};

module.exports = { scrapeAndSaveWeatherData };
