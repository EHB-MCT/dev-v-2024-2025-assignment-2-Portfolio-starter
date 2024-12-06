const fs = require('fs');

const data = JSON.parse(fs.readFileSync('../data/steps.json'));

function calculateAverageSteps(data) {
  const totalSteps = data.reduce((sum, day) => sum + day.stappen, 0);
  return (totalSteps / data.length).toFixed(2);
}

function findMostActiveDay(data) {
  return data.reduce((mostActive, day) =>
    day.stappen > mostActive.stappen ? day : mostActive
  );
}

function analyzeTrend(data) {
  let trend = "Neutral";
  const differences = data.map((day, index, arr) => {
    if (index === 0) return 0;
    return day.stappen - arr[index - 1].stappen;
  });

  const avgDifference = differences.slice(1).reduce((a, b) => a + b, 0) / (differences.length - 1);
  if (avgDifference > 0) trend = "Increasing";
  else if (avgDifference < 0) trend = "Decreasing";

  return trend;
}

const avgSteps = calculateAverageSteps(data);
const mostActiveDay = findMostActiveDay(data);
const trend = analyzeTrend(data);

console.log("Gemiddelde stappen per dag:", avgSteps);
console.log("Meest actieve dag:", mostActiveDay);
console.log("Trend in stappen:", trend);

fs.writeFileSync(
  '../output/results.json',
  JSON.stringify({ avgSteps, mostActiveDay, trend }, null, 2)
);
