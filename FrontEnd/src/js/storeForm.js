document.getElementById('storeForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission

    const selectedStore = document.getElementById('storeSelect').value;
    const seriesName = document.title;  // Assuming the title of the page holds the series name

    // Validate if a store is selected
    if (!selectedStore) {
        alert('Please select a store.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/storeChoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                series: seriesName,
                store: selectedStore,
            }),
        });

        // Check if the response is successful
        if (response.ok) {
            alert('Your choice has been recorded. Thank you!');
            document.getElementById('storeForm').reset();  // Reset the form after successful submission
        } else {
            throw new Error('Failed to record your choice.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
