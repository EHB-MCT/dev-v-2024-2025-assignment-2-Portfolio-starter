const puppeteer = require('puppeteer');

// Functie om weerinformatie te scrapen
const scrapeWeather = async () => {
    const url = 'https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759';  // Weather page

    const browser = await puppeteer.launch({ headless: false });  // Maak de browser zichtbaar voor debuggen
    const page = await browser.newPage();  // Open een nieuwe pagina
    await page.goto(url, { waitUntil: 'domcontentloaded' });  // Laad de pagina en wacht tot de inhoud is geladen

    try {
        // Wacht op de specifieke elementen voor temperatuur en dag
        await page.waitForSelector('.DailyContent--temp--axgOn', { visible: true, timeout: 60000 });
        await page.waitForSelector('.DailyContent--daypartDate--KXrEE', { visible: true, timeout: 60000 });

        // Scrape de temperatuur en de dag
        const weatherData = await page.evaluate(() => {
            const temperatureElement = document.querySelector('.DailyContent--temp--axgOn');
            const dayElement = document.querySelector('.DailyContent--daypartDate--KXrEE');

            const temperature = temperatureElement ? temperatureElement.innerText.trim() : 'Temperatuur niet gevonden';
            const day = dayElement ? dayElement.innerText.trim() : 'Dag niet gevonden';

            return { temperature, day };
        });

        console.log('Temperatuur:', weatherData.temperature);
        console.log('Dag:', weatherData.day);
    } catch (error) {
        console.log('Fout bij het wachten op selector of scrapen:', error);
    }

    await browser.close();  // Sluit de browser
};

// Voer de functie uit
scrapeWeather().catch(console.error);
