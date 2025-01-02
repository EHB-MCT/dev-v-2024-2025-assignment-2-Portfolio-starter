// main.js

import { createInsightLoop } from './script.js';

fetch('/api/weather-data')
    .then(response => response.json())
    .then(data => {
        const textualVisualization = document.getElementById('textualVisualization');
        const weatherTable = document.getElementById('weatherData'); // Table exists only on some pages

        let highestTemp = -Infinity;
        let lowestTemp = Infinity;
        let rainiestDay = null;
        let rainiestAmount = 0;
        let maxWindSpeed = 0;
        let maxWindDate = null;
        let tempDifference = 0;
        let hottestDay = null;
        let coldestDay = null;
        let totalWindSpeed = 0;
        let windDirectionCount = {};
        let totalEntries = data.length;

        // Loop through each weather item and populate the table or insights
        data.forEach(weather => {
            if (weatherTable) {
                // If table exists, populate it
                const row = document.createElement('tr');

                const cityCell = document.createElement('td');
                cityCell.textContent = 'Brussels';
                row.appendChild(cityCell);

                const tempCellHigh = document.createElement('td');
                const tempParts = weather.temperature.split('/');
                const highTemp = parseFloat(tempParts[0]);
                const lowTemp = parseFloat(tempParts[1]);
                tempCellHigh.textContent = highTemp;
                row.appendChild(tempCellHigh);

                const tempCellLow = document.createElement('td');
                tempCellLow.textContent = lowTemp;
                row.appendChild(tempCellLow);

                const precipCell = document.createElement('td');
                const rainfall = parseFloat(weather.precip);
                precipCell.textContent = rainfall;
                row.appendChild(precipCell);

                const windCellDirection = document.createElement('td');
                const windCellSpeed = document.createElement('td');
                const windParts = weather.wind.split(' ');
                const windDirection = windParts[0];
                const windSpeed = parseFloat(windParts.slice(1).join(' ').replace('km/h', ''));
                windCellDirection.textContent = windDirection;
                windCellSpeed.textContent = windSpeed;
                row.appendChild(windCellDirection);
                row.appendChild(windCellSpeed);

                const conditionParts = weather.condition.split(' / ');
                const conditionCell = document.createElement('td');
                conditionCell.textContent = conditionParts[0];
                row.appendChild(conditionCell);

                const additionalConditionCell = document.createElement('td');
                additionalConditionCell.textContent = conditionParts[1] || '';
                row.appendChild(additionalConditionCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = weather.date;
                row.appendChild(dateCell);

                weatherTable.appendChild(row);
            }

            // For textual insights
            const tempParts = weather.temperature.split('/');
            const highTemp = parseFloat(tempParts[0]);
            const lowTemp = parseFloat(tempParts[1]);

            if (highTemp > highestTemp) {
                highestTemp = highTemp;
                hottestDay = weather.date;
            }
            if (lowTemp < lowestTemp) {
                lowestTemp = lowTemp;
                coldestDay = weather.date;
            }

            const rainfall = parseFloat(weather.precip);
            if (rainfall > rainiestAmount) {
                rainiestAmount = rainfall;
                rainiestDay = weather.date;
            }

            const windParts = weather.wind.split(' ');
            const windDirection = windParts[0];
            const windSpeed = parseFloat(windParts.slice(1).join(' ').replace('km/h', ''));
            maxWindSpeed = Math.max(maxWindSpeed, windSpeed);
            if (windSpeed === maxWindSpeed) maxWindDate = weather.date;
            totalWindSpeed += windSpeed;
            windDirectionCount[windDirection] = (windDirectionCount[windDirection] || 0) + 1;
        });

        // Calculate temperature difference
        tempDifference = highestTemp - lowestTemp;

        const mostFrequentWindDirection = Object.keys(windDirectionCount).reduce((a, b) => windDirectionCount[a] > windDirectionCount[b] ? a : b);

        // Prepare insights
        const insights = [
            `vandaag, ${new Date().toLocaleDateString()} varieerde de temperatuur van ${lowestTemp}°C tot ${highestTemp}°C, met ${rainiestAmount} mm neerslag. De wind waaide vanuit ${mostFrequentWindDirection} met een gemiddelde snelheid van ${(totalWindSpeed / totalEntries).toFixed(2)} km/u, en de algemene weersomstandigheid was ${data[0]?.condition}.`,
            `De heetste dag die werd geregistreerd is ${hottestDay} januari, met een maximumtemperatuur van ${highestTemp}°C.`,
            `De koudste dag die werd geregistreerd is ${coldestDay}, januari met een minimumtemperatuur van ${lowestTemp}°C.`,
            `De regenachtigste dag die geregistreerd is is ${rainiestDay}, januari met een totale neerslag van ${rainiestAmount} mm.`,
            `De sterkste wind werd geregistreerd op ${maxWindDate}, met een snelheid van ${maxWindSpeed} km/u.`,
            `Het verschil tussen de heetste en koudste dagen was ${tempDifference}°C. Interessant genoeg had de regenachtigste dag een temperatuur van ${lowestTemp}°C, wat ${(lowestTemp < (highestTemp + lowestTemp) / 2) ? 'lager' : 'hoger'} was dan de gemiddelde geregistreerde temperatuur.`
        ];
        

        // Call the function to handle the insight loop
        if (textualVisualization) {
            createInsightLoop(insights, textualVisualization);
        }
    })
    .catch(error => console.error('Error fetching weather data:', error));
