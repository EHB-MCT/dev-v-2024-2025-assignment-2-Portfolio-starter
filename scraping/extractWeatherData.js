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

module.exports = extractWeatherDetails;
