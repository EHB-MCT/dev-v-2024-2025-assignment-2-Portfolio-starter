// scraping/getWeatherData.js

async function getWeatherData(page, url) {
    await page.goto(url); // Visit the page

    const weatherData = await page.evaluate(() => {
        const data = [];
        let index = 0;
        let detailIndex;

        // Loop through all detailIndex elements until none are found
        while (true) {
            detailIndex = document.querySelector(`#detailIndex${index}`);
            if (!detailIndex) {
                break; // Stop when no more detailIndex(n) elements are found
            }

            // Extract data from this element
            const date = detailIndex.querySelector('[data-testid="daypartName"]')?.innerText || ''; // Date
            const condition = detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb')?.innerText || ''; // Condition
            const temperature = (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO')?.innerText || '') 
                + '/' + (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb')?.innerText || ''); // Temperature
            const precip = detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span')?.innerText || ''; // Precipitation
            const wind = detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc')?.innerText || ''; // Wind direction and speed

            data.push({
                date,
                condition,
                temperature,
                precip,
                wind
            });

            index++; // Increment index to move to the next detailIndex element
        }

        return data;
    });

    // Add dateid for each weather data entry
    const processedData = weatherData.map(item => ({
        ...item,
        dateid: `date-${item.date.replace(/\s+/g, '-').toLowerCase()}` // Generate unique dateid
    }));

    return processedData;
}

module.exports = getWeatherData;
