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

// Laad de verwerkte data
const processedData = safeReadFile("processedData.json");

// Analyseer de data
processedData.forEach((dag) => {
	console.log(`Data voor: ${dag.datum}`);
	dag.apps.forEach((app) => {
		console.log(`- ${app.naam}: ${app.tijdInMinuten} minuten`);
	});
	console.log(`Totale tijd voor deze dag: ${dag.totaalTijdInMinuten} minuten`);
	console.log("--------------------------");
});
