const puppeteer = require('puppeteer'); 
const getWeatherData = require('./getWeatherData');  // Import the getWeatherData function

async function scrapeWeatherData(url) { 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Get the weather data from the given URL
    const weatherData = await getWeatherData(page, url);

    console.log(weatherData); // Display the weather data in console

    await browser.close();
}

module.exports = scrapeWeatherData;
