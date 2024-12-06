const fs = require('fs');

// Het pad naar je JSON-bestand met stappen data
const dataPath = './data/steps.json';
let data;
try {
  // Probeer het bestand te lezen en in JSON formaat te parseren
  data = JSON.parse(fs.readFileSync(dataPath));
} catch (error) {
  console.error(`Fout bij het lezen van ${dataPath}:`, error);
  process.exit(1);
}

// Functie om de gemiddelde stappen per dag te berekenen
function calculateAverageSteps(data) {
  const totalSteps = data.reduce((sum, day) => sum + day.stappen, 0); // 'stappen' in plaats van 'steps'
  return (totalSteps / data.length).toFixed(2);
}

// Functie om de meest actieve dag te vinden
function findMostActiveDay(data) {
  return data.reduce((mostActive, day) =>
    day.stappen > mostActive.stappen ? day : mostActive // 'stappen' in plaats van 'steps'
  );
}

// Functie om de trend in het aantal stappen te analyseren
function analyzeTrend(data) {
  let trend = "Neutral";
  const differences = data.map((day, index, arr) => {
    if (index === 0) return 0;
    return day.stappen - arr[index - 1].stappen; // 'stappen' in plaats van 'steps'
  });

  const avgDifference = differences.slice(1).reduce((a, b) => a + b, 0) / (differences.length - 1);
  if (avgDifference > 0) trend = "Increasing";
  else if (avgDifference < 0) trend = "Decreasing";

  return trend;
}

// Bereken de gemiddelde stappen, de meest actieve dag en de trend
const avgSteps = calculateAverageSteps(data);
const mostActiveDay = findMostActiveDay(data);
const trend = analyzeTrend(data);

// Log de resultaten naar de console
console.log("Gemiddelde stappen per dag:", avgSteps);
console.log("Meest actieve dag:", mostActiveDay);
console.log("Trend in stappen:", trend);

// Sla de resultaten op in een nieuw JSON-bestand
const outputPath = '../scripts/output/results.json';
try {
  fs.writeFileSync(outputPath, JSON.stringify({ avgSteps, mostActiveDay, trend }, null, 2));
  console.log(`Resultaten succesvol opgeslagen in ${outputPath}`);
} catch (error) {
  console.error(`Fout bij het opslaan van ${outputPath}:`, error);
}
