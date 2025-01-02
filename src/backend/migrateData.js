const sqlite3 = require("better-sqlite3");
const mongoose = require("mongoose");
const Encounter = require("./models/Encounter");

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

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:"),
);
mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Retrieve data from SQLite database
    const query = `
            SELECT 
                name, 
                encounter_id AS encounterId, 
                class AS className, 
                gear_score AS gearScore, 
                dps 
            FROM entity
        `;
    const rows = db.prepare(query).all();

    // Add each row to MongoDB
    for (const row of rows) {
      const encounter = new Encounter({
        name: row.name,
        encounterId: row.encounterId,
        className: row.className || null,
        gearScore: row.gearScore || 0,
        dps: row.dps || 0,
      });

      await encounter.save();
    }

    console.log("Data migration complete!");
  } catch (err) {
    console.error("Error during migration:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
});
