require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

(async () => {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
})();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));
app.use(express.static(path.join(__dirname, '..')));

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

app.put('/api/strava', async (req, res) => {
    const updateData = req.body;

    try {
        const database = client.db("Course_Project");
        const collection = database.collection("strava");

        const updateFields = {};
        for (const key in updateData) {
            if (updateData[key] !== undefined && key !== '_id') {
                updateFields[key] = updateData[key];
            }
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(updateData._id) },
            { $set: updateFields }
        );

        if (result.modifiedCount === 1) {
            res.status(200).send('Data successfully updated');
        } else {
            res.status(404).send('No matching record found');
        }
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Error updating data");
    }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
