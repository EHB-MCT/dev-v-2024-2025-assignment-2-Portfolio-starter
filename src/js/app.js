const axios = require('axios');

const API_KEY = '4ooZ2Ap3SG3KxK7FcriAgu9OHwdH7LXgR0Gda67I';
const API_URL = 'https://api.api-ninjas.com/v1/historicalevents';

async function getHistoricalEvents(text, year, month, day) {
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

    if (response.data && response.data.length > 0) {
      console.log(response.data);  
    } else {
      console.log('Geen evenementen gevonden met de opgegeven parameters.');
    }
  } catch (error) {
    console.error('Fout bij het ophalen van historische evenementen:', error.response ? error.response.data : error.message);
  }
}


getHistoricalEvents('independence', 1776);  
