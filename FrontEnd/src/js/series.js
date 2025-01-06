// Wait for the DOM to be fully loaded before executing the fetchSmiskiData function
document.addEventListener('DOMContentLoaded', () => {
    fetchSmiskiData();
});

// Function to fetch and handle all Smiski data, including collection completion and store data
async function fetchSmiskiData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        
        // Extract unique series names from the fetched data
        const seriesNames = [...new Set(data.map(smiski => smiski.series).filter(series => series))];
        console.log('Unique series names:', seriesNames);

        // Sequentially fetch collection completion and store data for each series
        for (const seriesName of seriesNames) {
            await fetchCollectionCompletion(seriesName);
            await fetchMostCommonStore(seriesName);
        }
    } catch (error) {
        console.error('Error fetching Smiski data:', error);
        // Provide feedback in the UI or a fallback mechanism if needed
    }
}

// Fetch and handle collection completion data for a given series
async function fetchCollectionCompletion(seriesName) {
    try {
        const response = await fetch(`http://localhost:3000/api/collectionCompletion/${encodeURIComponent(seriesName)}`);
        const data = await response.json();
        
        if (data && typeof data.completionPercentage === 'number') {
            createCollectionElement(seriesName, data.completionPercentage);
        } else {
            console.error(`Invalid completion percentage for series "${seriesName}":`, data);
            createCollectionElement(seriesName, 0); // Default to 0% if the data is invalid
        }
    } catch (error) {
        console.error(`Error fetching collection completion for ${seriesName}:`, error);
    }
}

// Fetch and handle the most common store data for a given series
async function fetchMostCommonStore(seriesName) {
    try {
        const response = await fetch(`http://localhost:3000/api/mostCommonStore/${encodeURIComponent(seriesName)}`);
        const data = await response.json();
        
        const mostCommonStore = data.mostCommonStore || 'Unknown';
        updateCollectionWithStore(seriesName, mostCommonStore);
    } catch (error) {
        console.error(`Error fetching most common store for ${seriesName}:`, error);
    }
}

// Create and display a collection element for a series, including its progress and store info
function createCollectionElement(seriesName, completionPercentage) {
    const collectionsContainer = document.getElementById('collections');

    // Create the main div for the collection
    const collectionDiv = document.createElement('div');
    collectionDiv.classList.add('collection');

    // Add a click event to redirect to the specific series page
    collectionDiv.addEventListener('click', () => {
        const pageName = seriesName.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '') + '.html';
        window.location.href = pageName;
    });

    // Create and add the series title
    const seriesTitle = document.createElement('h2');
    seriesTitle.textContent = seriesName;
    collectionDiv.appendChild(seriesTitle);

    // Placeholder for the store name, initially "Fetching"
    const storeName = document.createElement('p');
    storeName.classList.add('store-name');
    storeName.textContent = 'Fetching most common store...';
    collectionDiv.appendChild(storeName);

    // Create and add the progress bar for the collection completion
    const progressBar = document.createElement('progress');
    progressBar.value = completionPercentage; // Set completion percentage
    progressBar.max = 100;
    progressBar.textContent = `${Math.round(completionPercentage)}%`;
    collectionDiv.appendChild(progressBar);

    // Append the collection element to the container
    collectionsContainer.appendChild(collectionDiv);
}

// Update the store name for a given series
function updateCollectionWithStore(seriesName, store) {
    const collectionsContainer = document.getElementById('collections');
    const collectionDivs = collectionsContainer.querySelectorAll('.collection');

    // Find the collection div for the specific series and update the store name
    collectionDivs.forEach(div => {
        const titleElement = div.querySelector('h2');
        if (titleElement && titleElement.textContent === seriesName) {
            const storeName = div.querySelector('.store-name');
            if (storeName) {
                storeName.textContent = `Most Common Store for rares: ${store}`;
            }
        }
    });
}
