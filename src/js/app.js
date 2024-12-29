require('dotenv').config(); 

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://kobeberckmans:${process.env.MONGODB_PASSWORD}@cluster1.tpiy3cp.mongodb.net/course_project?retryWrites=true&w=majority`;

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
    
    const database = client.db("Course_Project"); 
    const collections = await database.listCollections().toArray();
    console.log("Available collections:", collections.map(coll => coll.name));
    
    const collection = database.collection("strava");
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
