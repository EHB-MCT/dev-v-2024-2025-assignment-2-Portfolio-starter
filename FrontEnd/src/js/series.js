document.addEventListener('DOMContentLoaded', () => {
    fetchSmiskiData();
});

function fetchSmiskiData() {
    fetch('http://localhost:3000/api/data')
        .then(response => response.json())
        .then(data => {
            const seriesNames = [...new Set(data.map(smiski => smiski.series).filter(series => series))];
            console.log('Unique series names:', seriesNames);

            // Sequential fetch for each series to avoid overwhelming the server
            seriesNames.reduce((promise, seriesName) => {
                return promise.then(() => {
                    // Chain the fetch operations
                    return fetchCollectionCompletion(seriesName)
                        .then(() => fetchMostCommonStore(seriesName));
                });
            }, Promise.resolve());
        })
        .catch(error => {
            console.error('Error fetching Smiski data:', error);
        });
}

function fetchCollectionCompletion(seriesName) {
    return fetch(`http://localhost:3000/api/collectionCompletion/${encodeURIComponent(seriesName)}`)
        .then(response => response.json())
        .then(data => {
            if (data && typeof data.completionPercentage === 'number') {
                createCollectionElement(seriesName, data.completionPercentage);
            } else {
                console.error(`Invalid completion percentage for series "${seriesName}":`, data);
                createCollectionElement(seriesName, 0); // Default to 0%
            }
        })
        .catch(error => {
            console.error(`Error fetching collection completion for ${seriesName}:`, error);
        });
}

function fetchMostCommonStore(seriesName) {
    return fetch(`http://localhost:3000/api/mostCommonStore/${encodeURIComponent(seriesName)}`)
        .then(response => response.json())
        .then(data => {
            const mostCommonStore = data.mostCommonStore || 'Unknown';
            updateCollectionWithStore(seriesName, mostCommonStore);
        })
        .catch(error => {
            console.error(`Error fetching most common store for ${seriesName}:`, error);
        });
}


function createCollectionElement(seriesName, completionPercentage) {
    const collectionsContainer = document.getElementById('collections');

    // Create a new collection element
    const collectionDiv = document.createElement('div');
    collectionDiv.classList.add('collection');

    // Add click event listener for redirection
    collectionDiv.addEventListener('click', () => {
        const pageName = seriesName.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '') + '.html';
        window.location.href = pageName;
    });

    // Create the heading (series name)
    const seriesTitle = document.createElement('h2');
    seriesTitle.textContent = seriesName;
    collectionDiv.appendChild(seriesTitle);

    // Placeholder for the store name
    const storeName = document.createElement('p');
    storeName.classList.add('store-name');
    storeName.textContent = 'Fetching most common store...';
    collectionDiv.appendChild(storeName);

    // Create the progress bar
    const progressBar = document.createElement('progress');
    progressBar.value = completionPercentage; // Ensure even 0 is displayed
    progressBar.max = 100;
    progressBar.textContent = `${Math.round(completionPercentage)}%`;
    collectionDiv.appendChild(progressBar);

    // Append the collection div to the container
    collectionsContainer.appendChild(collectionDiv);
}

function updateCollectionWithStore(seriesName, store) {
    const collectionsContainer = document.getElementById('collections');
    const collectionDivs = Array.from(collectionsContainer.getElementsByClassName('collection'));

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
