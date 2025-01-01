let seriesName = document.title; // Replace with the actual logic to get the series name
console.log("Series Name:", seriesName);

fetch(`http://localhost:3000/api/${encodeURIComponent(seriesName)}`)
    .then(response => response.json())
    .then(smiskiArray => {
        // Process the array of Smiski data and render them on the page
        renderSmiski(smiskiArray);
    })
    .catch(error => {
        console.error('Error fetching Smiski:', error);
    });

function renderSmiski(smiskiArray) {
    let htmlString = '';

    if (smiskiArray && smiskiArray.length > 0) {
        htmlString = smiskiArray.map(smiski => `
            <div class="smiski">
                <img src="${smiski.picture}" alt="${smiski.name}">
                <h4>${smiski.name}</h4>
                <p>${smiski.description}</p>
            </div>
        `).join(''); // Combine all the individual Smiski HTML into a single string
    } else {
        htmlString = '<p>No Smiskis found in this series.</p>';
    }

    document.getElementById('smiskis').innerHTML = htmlString;
}
