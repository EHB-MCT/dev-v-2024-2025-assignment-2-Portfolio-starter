document.getElementById('storeForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const selectedStore = document.getElementById('storeSelect').value;
    const seriesName = document.title; 

    fetch('http://localhost:3000/api/storeChoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            series: seriesName,
            store: selectedStore,
        }),
    })
        .then(response => {
            if (response.ok) {
                alert('Your choice has been recorded. Thank you!');
            } else {
                throw new Error('Failed to record your choice.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});
