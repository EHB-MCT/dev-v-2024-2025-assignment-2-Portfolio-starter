const { MongoClient, ServerApiVersion } = require('mongodb');

// Je correcte connection string (controleer gebruikersnaam, wachtwoord en database)
const uri = "mongodb+srv://kobeberckmans:passwordpassword@cluster1.tpiy3cp.mongodb.net/<course_project>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const database = client.db("Course_Project"); // Vervang "test" door je database naam
    const collection = database.collection("strava");

    // Voorbeeld: haal data op uit de collectie
    const data = await collection.find({}).toArray();
    console.log("Data from collection:", data);
  } catch (error) {
    console.error("Connection failed:", error.message);
    console.error("Full error:", error);
  } finally {
    await client.close();
  }
}

testConnection();
