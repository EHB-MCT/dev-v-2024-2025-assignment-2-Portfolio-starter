const fs = require("fs");

// Laad de verwerkte data
const processedData = JSON.parse(fs.readFileSync("processedData.json"));

// Analyseer de data
processedData.forEach((dag) => {
	console.log(`Data voor: ${dag.datum}`);
	dag.apps.forEach((app) => {
		console.log(`${app.naam}: ${app.tijdInMinuten} minuten`);
	});
	console.log(`Totale tijd voor deze dag: ${dag.totaalTijdInMinuten} minuten`);
	console.log("--------------------------");
});
