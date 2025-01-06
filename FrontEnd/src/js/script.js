document.addEventListener('DOMContentLoaded', () => {
    const seriesName = document.title;  // Assuming the title of the page holds the series name
    console.log("Series Name:", seriesName);

    fetchSmiskiData(seriesName);
});

// Fetch the Smiski data based on the series name
async function fetchSmiskiData(seriesName) {
    try {
        const response = await fetch(`http://localhost:3000/api/${encodeURIComponent(seriesName)}`);
        const smiskiArray = await response.json();
        
        if (smiskiArray && smiskiArray.length > 0) {
            renderSmiski(smiskiArray);
        } else {
            renderEmptyMessage();
        }
    } catch (error) {
        console.error('Error fetching Smiski data:', error);
        renderErrorMessage();
    }
}

// Render the Smiski items dynamically
function renderSmiski(smiskiArray) {
    const smiskisContainer = document.getElementById('smiskis');
    smiskisContainer.innerHTML = smiskiArray.map(smiski => createSmiskiHTML(smiski)).join('');

    // Attach event listeners to all checkboxes after rendering
    document.querySelectorAll('.inCollectionCheckbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

// Create the HTML structure for each Smiski item
function createSmiskiHTML(smiski) {
    return `
        <div class="smiski">
            <img src="${smiski.picture}" alt="${smiski.name}">
            <h4>${smiski.name}</h4>
            <p>${smiski.description}</p>
            <label>
                In Collection:
                <input type="checkbox" ${smiski.inCollection ? 'checked' : ''} data-name="${smiski.name}" class="inCollectionCheckbox">
            </label>
        </div>
    `;
}

// Render a message if no Smiskis are found in this series
function renderEmptyMessage() {
    document.getElementById('smiskis').innerHTML = '<p>No Smiskis found in this series.</p>';
}

// Render an error message in case of a failed API request
function renderErrorMessage() {
    document.getElementById('smiskis').innerHTML = '<p>There was an error fetching the data. Please try again later.</p>';
}

// Handle the checkbox state change (inCollection toggle)
async function handleCheckboxChange(event) {
    const smiskiName = event.target.getAttribute('data-name');
    const inCollection = event.target.checked;

    try {
        const response = await fetch(`http://localhost:3000/api/toggleInCollection/${smiskiName}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inCollection })
        });
        const updatedSmiski = await response.json();
        console.log('Updated Smiski:', updatedSmiski);
    } catch (error) {
        console.error('Error updating inCollection:', error);
    }
}
