require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

const uri = `mongodb+srv://kobeberckmans:${process.env.MONGODB_PASSWORD}@cluster1.tpiy3cp.mongodb.net/course_project?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Verbind met de database tijdens de server runtime
(async () => {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
})();
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));

// Statische bestanden serveren (voor CSS en JS)
app.use(express.static(path.join(__dirname, '..'))); // Serveert rootmap als statische bestanden

// API-endpoint om data op te halen
app.get('/api/strava', async (req, res) => {
  try {
    const database = client.db("Course_Project");
    const collection = database.collection("strava");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

// Route om `index.html` te serveren
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..','..', 'index.html')); // Verwijst naar index.html in de root
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

