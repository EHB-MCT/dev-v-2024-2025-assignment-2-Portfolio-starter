const { format } = require('date-fns'); // Importing the format function from date-fns
const { nl } = require('date-fns/locale'); // Importing Dutch locale

async function getWeatherData(page, url) {
    // Get the current date and format it to the same style as the other dates
    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, 'dd MMM yyyy'); // Full date format for today
    const formattedToday = format(currentDate, 'dd'); // Extract the day (e.g., 30)
    const currentDayOfWeek = format(currentDate, 'iii', { locale: nl }); // Get the abbreviated day of the week in Dutch (e.g., 'ma' for Monday)

    // Truncate the day to 2 characters if it has 3 characters (e.g., 'maa' -> 'ma')
    const shortDayOfWeek = currentDayOfWeek.length > 2 ? currentDayOfWeek.slice(0, 2) : currentDayOfWeek;

    await page.goto(url); // Visit the page

    const weatherData = await page.evaluate((formattedCurrentDate, formattedToday, shortDayOfWeek) => {
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
            let date = detailIndex.querySelector('[data-testid="daypartName"]')?.innerText || ''; // Date
            const condition = detailIndex.querySelector('[data-testid="wxIcon"] .DetailsSummary--extendedData--eJzhb')?.innerText || ''; // Condition
            const temperature = (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--highTempValue--VHKaO')?.innerText || '') 
                + '/' + (detailIndex.querySelector('[data-testid="detailsTemperature"] .DetailsSummary--lowTempValue--ogrzb')?.innerText || ''); // Temperature
            const precip = detailIndex.querySelector('[data-testid="Precip"] .DetailsSummary--precipIcon--6CgcC + span')?.innerText || ''; // Precipitation
            const wind = detailIndex.querySelector('[data-testid="wind"] .Wind--windWrapper--NsCjc')?.innerText || ''; // Wind direction and speed

            // Check if date is "today" or "tonight" (in Dutch: "vandaag", "vanavond") and replace with custom date format
            if (date.toLowerCase().includes('vandaag') || date.toLowerCase().includes('vanavond')) {
                // Set date to custom format like 'ma 30' instead of full date like '30 Dec 2024'
                date = `${shortDayOfWeek} ${formattedToday}`; // 'ma 30' format
            }

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
    }, formattedCurrentDate, formattedToday, shortDayOfWeek); // Pass the formatted values to the page.evaluate() function

    // Add dateid for each weather data entry
    const processedData = weatherData.map(item => ({
        ...item,
        dateid: `date-${item.date.replace(/\s+/g, '-').toLowerCase()}` // Generate unique dateid
    }));

    return processedData;
}

module.exports = getWeatherData;
