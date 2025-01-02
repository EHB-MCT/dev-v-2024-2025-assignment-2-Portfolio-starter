const fs = require("fs");

// Laad de raw data
const rawData = JSON.parse(fs.readFileSync("rawData.json"));

// Verwerk de data
const processedData = rawData.map((dag) => {
	const totaalPerDag = dag.apps.reduce(
		(totaal, app) => totaal + app.tijdInMinuten,
		0
	);
	return {
		datum: dag.datum,
		totaalTijdInMinuten: totaalPerDag,
		apps: dag.apps,
	};
});

// Sla de verwerkte data op in processedData.json
fs.writeFileSync("processedData.json", JSON.stringify(processedData, null, 2));

console.log("Data is succesvol verwerkt!");
