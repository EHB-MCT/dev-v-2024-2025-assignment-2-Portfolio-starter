// scraping/scrapeWeatherData.js

const puppeteer = require('puppeteer'); 
const getWeatherData = require('./getWeatherData');  // Importeer de getWeatherData functie

async function scrapeWeatherData(url) { 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Verkrijg de weersgegevens van de opgegeven URL
    const weatherData = await getWeatherData(page, url);

    console.log(weatherData); // vertonen van de weatherdata in console

    await browser.close();
}

module.exports = scrapeWeatherData;
