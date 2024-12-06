fetch('../data/steps.json')  // Laad de stappen data van de steps.json file
    .then(response => response.json())
    .then(stepsData => {
        // Haal de gegevens uit de response en toon ze in de HTML
        fetch('../scripts/output/results.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('avgSteps').textContent = data.avgSteps;
                document.getElementById('mostActiveDay').textContent = `${data.mostActiveDay.datum}: ${data.mostActiveDay.stappen} stappen`;  // Correctie hier
                document.getElementById('trend').textContent = data.trend;

                // Stap 2: Laad de ruwe stapdata om de grafiek te maken
                const labels = stepsData.map(entry => entry.datum); // Gebruik 'datum' uit de JSON
                const dataPoints = stepsData.map(entry => entry.stappen); // Gebruik 'stappen' uit de JSON

                // Maak de grafiek met Chart.js
                const ctx = document.getElementById('stepsChart').getContext('2d');
                const stepsChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Aantal Stappen per Dag',
                            data: dataPoints,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Trends in Aantal Stappen per Dag'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return 'Stappen: ' + tooltipItem.raw.toLocaleString();
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Datum'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Aantal Stappen'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Fout bij het laden van resultaten:', error));
    })
    .catch(error => console.error('Fout bij het laden van stappen data:', error));
