// index.js

require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./database/connectDB'); // Separate database connection logic
const { scrapeAndSaveWeatherData } = require('./scraping/scrapeWeatherData'); // Separate scraping logic
const startServer = require('./server/routes'); // Server initialization

const main = async () => {
    await connectDB(); // Ensure DB connection before starting the app
    await scrapeAndSaveWeatherData(); // Optionally, you can run this on an interval or a schedule
    startServer(); // Start the server after the DB connection
};

// Start the app
main();
