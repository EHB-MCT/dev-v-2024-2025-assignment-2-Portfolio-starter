const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
    date: String,
    condition: String,
    temperature: String,
    precip: String,
    wind: String,
});

module.exports = mongoose.model('WeatherData', WeatherDataSchema);
