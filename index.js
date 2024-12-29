const puppeteer = require('puppeteer');
const getWeatherData = require('./scraping/getWeatherData');
const { connectToDatabase, getDatabase } = require('./database/mongo');

(async () => {
    // Connect to MongoDB
    await connectToDatabase();
    const db = getDatabase();
    const collection = db.collection('weather'); // Replace with your collection name

    // Start Puppeteer and scrape data
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759';

    try {
        const weatherData = await getWeatherData(page, url);

        // Save to MongoDB
        const result = await collection.insertMany(weatherData);
        console.log(`${result.insertedCount} weather records saved to database.`);
    } catch (error) {
        console.error('Error scraping or saving data:', error);
    } finally {
        await browser.close();
    }
})();
