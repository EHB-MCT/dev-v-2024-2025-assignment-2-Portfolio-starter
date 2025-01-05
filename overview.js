const fs = require("fs");

// Controleer of een bestand bestaat en lees het veilig
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

// Genereer overzicht
let totaalTijd = 0;
let totaalAantalApps = 0;

processedData.forEach((dag) => {
	totaalTijd += dag.totaalTijdInMinuten;
	totaalAantalApps += dag.apps.length;
});

console.log(`Totaal voor alle dagen: ${totaalTijd} minuten`);
console.log(`Aantal apps in totaal: ${totaalAantalApps}`);
