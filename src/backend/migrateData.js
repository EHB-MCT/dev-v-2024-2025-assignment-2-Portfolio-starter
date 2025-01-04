const sqlite3 = require("better-sqlite3");
const mongoose = require("mongoose");
const Encounter = require("./models/Encounter");
const { encounterMap } = require("./utils/bossMap");
const { estherMap } = require("./utils/allyMap");

// Flatten boss and ally names into sets
const knownBosses = new Set(
	Object.values(encounterMap)
		.flatMap((raid) => Object.values(raid))
		.flat()
);

const knownAllies = new Set(estherMap.map((ally) => ally.name));

// Function to determine the type of an encounter
const getType = (name) => {
	if (knownBosses.has(name)) return "boss";
	if (knownAllies.has(name)) return "ally";
	return "character";
};

// Connect to SQLite database
const db = sqlite3("C:/Users/Rachelle/AppData/Local/LOA Logs/encounters.db", {
	verbose: console.log,
});

// Connect to MongoDB
const connectionString =
	"mongodb+srv://rachellevanuden:1234@sharedcluster.8uk56.mongodb.net/DPSMeter?retryWrites=true&w=majority&appName=SharedCluster";
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
	console.error("Connection error:", error);
});

mongoose.connection.once("open", async () => {
	console.log("Connected to MongoDB");

	try {
		// Retrieve data from SQLite in batches
		const batchSize = 100;
		let offset = 0;
		let rows = [];

		do {
			const query = `
                SELECT 
                    name, 
                    encounter_id AS encounterId, 
                    class AS className, 
                    gear_score AS gearScore, 
                    dps 
                FROM entity
                LIMIT ${batchSize} OFFSET ${offset}
            `;
			rows = db.prepare(query).all();
			offset += batchSize;

			console.log(`Retrieved ${rows.length} records from SQLite`);
			console.log("Fetched rows:", rows);

			// Add type and insert into MongoDB
			const documents = rows.map((row) => ({
				name: row.name,
				encounterId: row.encounterId,
				className: row.className || null,
				gearScore: row.gearScore || 0,
				dps: row.dps || 0,
				type: getType(row.name), // Determine type
			}));

			try {
				await Encounter.insertMany(documents, { ordered: false });
				console.log(`Batch of ${rows.length} records migrated.`);
			} catch (insertError) {
				console.error("Error inserting batch:", insertError.message);
			}
		} while (rows.length === batchSize);

		console.log("Data migration complete!");
	} catch (err) {
		console.error("Error during migration:", err.message);
	} finally {
		mongoose.connection.close();
		console.log("MongoDB connection closed.");
	}
});
