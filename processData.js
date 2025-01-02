const fs = require("fs");

// Lees de data uit data.json
fs.readFile("data.json", "utf8", (err, data) => {
	if (err) {
		console.error("Er is een fout bij het lezen van de data:", err);
		return;
	}

	// Parseer de data van JSON naar een JavaScript object
	const rawData = JSON.parse(data);

	// Functie om de tijd (bijv. '3u20min' of '20min') om te zetten naar minuten
	function convertTimeToMinutes(time) {
		// Als er uren en minuten zijn (bijv. '3u20min')
		const timeParts = time.split("u");
		if (timeParts.length === 2) {
			const hours = parseInt(timeParts[0]);
			const minutes = parseInt(timeParts[1].replace("min", ""));

			return hours * 60 + minutes;
		}
		// Als er geen uren zijn, maar alleen minuten (bijv. '20min')
		if (time.includes("min")) {
			const minutes = parseInt(time.replace("min", "").trim());
			return minutes;
		}

		// Als het formaat niet klopt, geef dan 0 minuten terug
		console.warn(`Ongeldig tijdformaat: ${time}`);
		return 0;
	}

	// Verwerk de data om de tijd om te zetten naar minuten
	const processedData = rawData.map((day) => {
		return {
			datum: day.datum,
			apps: day.apps.map((app) => {
				return {
					naam: app.naam,
					tijd: app.tijd,
					openingen: app.openingen,
					tijdInMinuten: convertTimeToMinutes(app.tijd), // Omgezette tijd in minuten
				};
			}),
		};
	});

	// Schrijf de verwerkte data terug naar data.json
	fs.writeFile(
		"data.json",
		JSON.stringify(processedData, null, 2),
		"utf8",
		(err) => {
			if (err) {
				console.error("Er is een fout bij het opslaan van de data:", err);
			} else {
				console.log("Data succesvol verwerkt en opgeslagen in data.json");
			}
		}
	);
});
