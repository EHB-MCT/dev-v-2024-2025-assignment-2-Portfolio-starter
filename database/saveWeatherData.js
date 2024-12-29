const WeatherData = require('../models/weatherData');

const saveWeatherData = async (data) => {
    try {
        await WeatherData.insertMany(data);
        console.log('Weather data saved to database');
    } catch (err) {
        console.error('Error saving data:', err);
    }
};

module.exports = saveWeatherData;
