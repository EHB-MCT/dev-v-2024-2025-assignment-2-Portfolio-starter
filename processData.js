const fs = require("fs");

// Controle of een bestand bestaat en als het veilig is
const safeReadFile = (filePath) => {
	if (!fs.existsSync(filePath)) {
		console.error(`Error: Bestand "${filePath}" niet gevonden.`);
		process.exit(1);
	}
	try {
		return JSON.parse(fs.readFileSync(filePath, "utf8"));
	} catch (error) {
		console.error(
			`Error bij het lezen/parsen van "${filePath}":`,
			error.message
		);
		process.exit(1);
	}
};

// Laden van raw data
const rawData = safeReadFile("rawData.json");

// Verwerking data
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

// opslaan van de verwerkte data
const outputFilePath = "processedData.json";
fs.writeFileSync(outputFilePath, JSON.stringify(processedData, null, 2));
console.log(`Data succesvol verwerkt en opgeslagen in "${outputFilePath}".`);
