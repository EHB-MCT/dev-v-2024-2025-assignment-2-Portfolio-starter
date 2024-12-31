    // Fetch the weather data from the API
fetch('/api/weather-data')
    .then(response => response.json())
    .then(data => {
        const weatherTable = document.getElementById('weatherData');
        
        // Loop through each weather item and populate the table
        data.forEach(weather => {
            const row = document.createElement('tr');

            // City - always set to Brussels
            const cityCell = document.createElement('td');
            cityCell.textContent = 'Brussels';
            row.appendChild(cityCell);

            // Highest Temperature
            const tempCellHigh = document.createElement('td');
            const tempParts = weather.temperature.split('/');
            tempCellHigh.textContent = tempParts[0]; // Display the highest temperature
            row.appendChild(tempCellHigh);

            // Lowest Temperature
            const tempCellLow = document.createElement('td');
            tempCellLow.textContent = tempParts[1]; // Display the lowest temperature
            row.appendChild(tempCellLow);

            // Rainfall
            const precipCell = document.createElement('td');
            precipCell.textContent = weather.precip;
            row.appendChild(precipCell);

            // Wind - split into direction and speed
            const windCellDirection = document.createElement('td');
            const windCellSpeed = document.createElement('td');

            const windParts = weather.wind.split(' ');  // Splitting into direction and speed parts
            windCellDirection.textContent = windParts[0];  // Direction
            windCellSpeed.textContent = windParts.slice(1).join(' ');  // Speed (joins the rest, like '30 km/h')
            
            row.appendChild(windCellDirection);
            row.appendChild(windCellSpeed);

            // Condition - split by " / " if multiple conditions
            const conditionParts = weather.condition.split(' / ');
            const conditionCell = document.createElement('td');
            conditionCell.textContent = conditionParts[0]; // First condition
            row.appendChild(conditionCell);

            // Additional Condition - second condition if it exists
            const additionalConditionCell = document.createElement('td');
            additionalConditionCell.textContent = conditionParts[1] || ''; // Second condition (if exists)
            row.appendChild(additionalConditionCell);

            // Date - directly from the scraped data (e.g., 'di 14')
            const dateCell = document.createElement('td');
            dateCell.textContent = weather.date;  // Display the date as is
            row.appendChild(dateCell);

            // Append the row to the table
            weatherTable.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching weather data:', error));

