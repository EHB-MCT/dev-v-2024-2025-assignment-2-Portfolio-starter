// your scripts
// insightLooper.js

export function createInsightLoop(insights, containerElement) {
    let currentIndex = 0;

    // Display the first insight
    const insightElement = document.createElement('p');
    insightElement.textContent = insights[currentIndex];
    containerElement.appendChild(insightElement);

    // Create and append the Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    containerElement.appendChild(nextButton);

    // Function to show the next insight
    function showNextInsight() {
        currentIndex = (currentIndex + 1) % insights.length; // Loop back to the first insight when we reach the end
        insightElement.textContent = insights[currentIndex];
    }

    // Add event listener for the Next button
    nextButton.addEventListener('click', showNextInsight);
}
