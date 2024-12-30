const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
    dateid: { 
        type: String, 
        required: true, 
        unique: true,  // Ensure dateid is unique
    },
    date: { type: String, required: true },
    condition: String,
    temperature: String,
    precip: String,
    wind: String,
});

const WeatherData = mongoose.model('WeatherData', WeatherDataSchema);

module.exports = WeatherData;
