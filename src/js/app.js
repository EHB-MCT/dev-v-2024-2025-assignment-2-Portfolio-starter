document.getElementById('searchButton').addEventListener('click', async () => {
  const searchInput = document.getElementById('searchInput').value.trim();

  if (searchInput === '') {
      alert('Voer een zoekterm in.');
      return;
  }

  try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/historicalevents`, {
          headers: {
              'X-Api-Key': '4ooZ2Ap3SG3KxK7FcriAgu9OHwdH7LXgR0Gda67I'
          },
          params: {
              text: searchInput
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
});
