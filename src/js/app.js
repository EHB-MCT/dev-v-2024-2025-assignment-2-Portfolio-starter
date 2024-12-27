const API_KEY = '4ooZ2Ap3SG3KxK7FcriAgu9OHwdH7LXgR0Gda67I';
const API_URL = 'https://api.api-ninjas.com/v1/historicalevents';

async function searchEvents(text, year = '', month = '', day = '') {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'X-Api-Key': API_KEY
            },
            params: {
                text: text,
                year: year,
                month: month,
                day: day
            }
        });

        const events = response.data;
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = '';

        if (events.length === 0) {
            eventList.innerHTML = '<p>Geen evenementen gevonden met de opgegeven zoekterm.</p>';
        } else {
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.innerHTML = `
                    <h3>${event.year || 'Onbekend'}</h3>
                    <p><strong>Uitleg:</strong> ${event.event || 'Geen beschrijving beschikbaar'}</p>
                `;
                eventList.appendChild(eventDiv);
            });
        }
    } catch (error) {
        console.error('Fout bij het ophalen van evenementen:', error);
        alert('Er is een fout opgetreden bij het ophalen van evenementen. Probeer het later opnieuw.');
    }
}

// Event listener voor geavanceerd zoeken
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const yearInput = document.getElementById('yearInput').value.trim();
    const monthInput = document.getElementById('monthInput').value.trim();
    const dayInput = document.getElementById('dayInput').value.trim();

    searchEvents(searchInput, yearInput, monthInput, dayInput);
});
