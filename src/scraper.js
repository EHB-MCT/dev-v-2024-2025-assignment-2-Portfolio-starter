const puppeteer = require('puppeteer');

async function scrapeWeatherData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759');  // Vervang met de URL van de website

    // Scrape de gewenste data uit detailIndex2
    const weatherData = await page.evaluate(() => {
        // Zoek naar het details element met id="detailIndex2"
        const detailIndex = document.querySelector('#detailIndex3'); // neemt het element van detailindex

        // Haal de gegevens uit dit element
        const date = detailIndex.querySelector('[data-testid="daypartName"]').innerText; // Datum
        const condition = detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb').innerText; // Weersomstandigheid
        const temperature = detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO').innerText 
            + '/' + detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb').innerText; // Temperatuur
        const precip = detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span').innerText; // Neerslagpercentage
        const wind = detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc').innerText; // Windrichting en snelheid

        return {
            date,
            condition,
            temperature,
            precip,
            wind
        };
    });

    console.log(weatherData);

    await browser.close();
}

scrapeWeatherData();
