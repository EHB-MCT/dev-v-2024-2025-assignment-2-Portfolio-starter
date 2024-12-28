const puppeteer = require('puppeteer');

async function scrapeWeatherData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://weather.com/nl-NL/weer/10dagen/l/feec7bad826562e9203ce8595a2fbdf1b297ea39ffcf16755cf68963f1caf759');  // Vervang met de URL van de website

    // Scrape de gewenste data uit alle detailIndex's
    const weatherData = await page.evaluate(() => {
        const data = [];
        let index = 0;
        let detailIndex;

        // Blijf door de detailIndex elementen gaan totdat er geen meer zijn
        while (true) {
            detailIndex = document.querySelector(`#detailIndex${index}`);
            if (!detailIndex) {
                break;  // Stop als er geen detailIndex(n) meer is
            }

            // Haal de gegevens uit dit element
            const date = detailIndex.querySelector('[data-testid="daypartName"]') ? detailIndex.querySelector('[data-testid="daypartName"]').innerText : '';
            const condition = detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb') ? detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb').innerText : '';
            const temperature = (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO') ? detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO').innerText : '')
                + '/' + (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb') ? detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb').innerText : ''); // Temperatuur
            const precip = detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span') ? detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span').innerText : '';
            const wind = detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc') ? detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc').innerText : '';

            data.push({
                date,
                condition,
                temperature,
                precip,
                wind
            });

            index++;  // Verhoog index om naar het volgende detailIndex element te gaan
        }

        return data;
    });

    console.log(weatherData);

    await browser.close();
}

scrapeWeatherData();
