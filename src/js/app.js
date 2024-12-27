// API key and URL
const API_KEY = '4ooZ2Ap3SG3KxK7FcriAgu9OHwdH7LXgR0Gda67I'; // API key for authenticating with the API
const API_URL = 'https://api.api-ninjas.com/v1/historicalevents'; // URL of the historical events API

/**
 * Function to search events based on search term, year, month, and day.
 * 
 * @param {string} text - The search term for events.
 * @param {string} [year=''] - (Optional) Year to filter events.
 * @param {string} [month=''] - (Optional) Month to filter events.
 * @param {string} [day=''] - (Optional) Day to filter events.
 */
async function searchEvents(text, year = '', month = '', day = '') {
    try {
        // API call to fetch events
        const response = await axios.get(API_URL, {
            headers: {
                'X-Api-Key': API_KEY // Adding API key to headers
            },
            params: {
                text: text,  // Including search term as parameter
                year: year,  // Optional: Including year as parameter
                month: month, // Optional: Including month as parameter
                day: day      // Optional: Including day as parameter
            }
        });

        const events = response.data; // Storing response data
        const eventList = document.getElementById('eventList'); // Selecting element for event list
        eventList.innerHTML = ''; // Clearing event list

        // Check if any events are found
        if (events.length === 0) {
            eventList.innerHTML = '<p>No events found with the provided search term.</p>';
        } else {
            // Display events with their details
            events.forEach(event => {
                const eventDiv = document.createElement('div'); // Creating div element for event
                eventDiv.innerHTML = `
                    <h3>${event.year || 'Unknown'}</h3> 
                    <p><strong>Description:</strong> ${event.event || 'No description available'}</p> 
                `;
                eventList.appendChild(eventDiv); // Adding event to the list
            });
        }
    } catch (error) {
        console.error('Error fetching events:', error); // Error message on failure
        alert('An error occurred while fetching events. Please try again later.');
    }
}

// Event listener for advanced search
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const yearInput = document.getElementById('yearInput').value.trim();
    const monthInput = document.getElementById('monthInput').value.trim();
    const dayInput = document.getElementById('dayInput').value.trim();

    searchEvents(searchInput, yearInput, monthInput, dayInput);
});
