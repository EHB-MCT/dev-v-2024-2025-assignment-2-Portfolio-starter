// scraping/getWeatherData.js

async function getWeatherData(page, url) {
    await page.goto(url);  // Bezoek de pagina

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
            const date = detailIndex.querySelector('[data-testid="daypartName"]')?.innerText || ''; //datum 
            const condition = detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb')?.innerText || ''; //conditie (regen, sneeuw,...)
            const temperature = (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO')?.innerText || '') 
                + '/' + (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb')?.innerText || ''); // Temperatuur
            const precip = detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span')?.innerText || ''; //kans op regen
            const wind = detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc')?.innerText || ''; //windrichting & snelheid.

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

    return weatherData;
}

module.exports = getWeatherData;
