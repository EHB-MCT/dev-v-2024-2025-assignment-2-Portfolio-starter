const stepsData = [
    { date: '2024-11-20', steps: 5825 },
    { date: '2024-11-21', steps: 6172 },
    { date: '2024-11-22', steps: 5541 },
    { date: '2024-11-23', steps: 7035 },
    { date: '2024-11-24', steps: 6264 },
    { date: '2024-11-25', steps: 7581 },
    { date: '2024-11-26', steps: 6804 },
    { date: '2024-11-27', steps: 6453 },
    { date: '2024-11-28', steps: 7321 },
    { date: '2024-11-29', steps: 7993 },
    { date: '2024-11-30', steps: 6754 },
    { date: '2024-12-01', steps: 7032 },
    { date: '2024-12-02', steps: 7601 },
    { date: '2024-12-03', steps: 6890 },
    { date: '2024-12-04', steps: 7212 },
    { date: '2024-12-05', steps: 6543 },
    { date: '2024-12-06', steps: 7125 },
];

const labels = stepsData.map(entry => entry.date);
const data = stepsData.map(entry => entry.steps);

const config = {
    type: 'line',
    data: {
        labels: labels, 
        datasets: [{
            label: 'Aantal Stappen per Dag',
            data: data, 
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
};

// Render de grafiek op het canvas-element
const ctx = document.getElementById('stepsChart').getContext('2d');
const stepsChart = new Chart(ctx, config);
