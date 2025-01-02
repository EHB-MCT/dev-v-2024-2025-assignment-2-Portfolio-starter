const { format } = require('date-fns');
const { nl } = require('date-fns/locale');
const { getFormattedDate } = require('../utils/formatDate');

async function getWeatherData(page, url) {
    const currentDate = new Date();
    const { formattedToday, shortDayOfWeek } = getFormattedDate(currentDate);

    await page.goto(url); // Visit the page

    const weatherData = await page.evaluate((formattedToday, shortDayOfWeek) => {
        // Define the extractWeatherDetails function inside the evaluate context
        const extractWeatherDetails = (detailIndex, formattedToday, shortDayOfWeek) => {
            let date = detailIndex.querySelector('[data-testid="daypartName"]')?.innerText || '';
            const condition = detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb')?.innerText || '';
            const temperature = (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO')?.innerText || '') 
                + '/' + (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb')?.innerText || '');
            const precip = detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span')?.innerText || '';
            const wind = detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc')?.innerText || '';

            if (date.toLowerCase().includes('vandaag') || date.toLowerCase().includes('vanavond')) {
                date = `${shortDayOfWeek} ${formattedToday}`;
            }

            return { date, condition, temperature, precip, wind };
        };

        const data = [];
        let index = 0;
        let detailIndex;

        while (true) {
            detailIndex = document.querySelector(`#detailIndex${index}`);
            if (!detailIndex) {
                break; // Stop when no more detailIndex(n) elements are found
            }

            // Extract data from this element using the local extractWeatherDetails function
            const weatherDetails = extractWeatherDetails(detailIndex, formattedToday, shortDayOfWeek);
            data.push(weatherDetails);
            index++;
        }

        return data;
    }, formattedToday, shortDayOfWeek); // Pass formatted values to the page.evaluate() function

    const processedData = weatherData.map(item => ({
        ...item,
        dateid: `date-${item.date.replace(/\s+/g, '-').toLowerCase()}` // Generate unique dateid
    }));

    return processedData;
}

module.exports = getWeatherData;
