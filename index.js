// index.js

const scrapeWeatherData = require('./scraping/scrapeWeatherData');  // Importeer de scraping functie

const url = 'https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759';  // Vervang met de URL van de website

scrapeWeatherData(url);

console.log('einde index.js')