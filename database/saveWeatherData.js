// scraping/scrapeWeatherData.js

const WeatherData = require('../models/weatherData');  // Import the WeatherData model

const saveWeatherData = async (data) => {
    console.log('Data to Save:', data); // Debug log

    const validData = data.filter(item => item.dateid); // Ensure `dateid` is present
    if (validData.length !== data.length) {
        console.warn('Some entries were missing `dateid` and were skipped.');
    }

    try {
        // Save valid data to MongoDB
        await WeatherData.insertMany(validData);
        console.log('Weather data saved to database');
    } catch (err) {
        if (err.code === 11000) {
            console.error('Duplicate dateid found. Skipping duplicates.');
        } else {
            console.error('Error saving data:', err);
        }
    }
};

module.exports = saveWeatherData;
