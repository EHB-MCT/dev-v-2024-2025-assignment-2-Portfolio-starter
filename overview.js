const fs = require("fs");

// Laad de verwerkte data
const processedData = JSON.parse(fs.readFileSync("processedData.json"));

// Genereer overzicht
let totaalTijd = 0;
let totaalAantalApps = 0;
processedData.forEach((dag) => {
	totaalTijd += dag.totaalTijdInMinuten;
	totaalAantalApps += dag.apps.length;
});

console.log(`Totaal voor alle dagen: ${totaalTijd} minuten`);
console.log(`Aantal apps in totaal: ${totaalAantalApps}`);
