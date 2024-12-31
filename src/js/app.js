require('dotenv').config(); // Load environment variables from a .env file into process.env
const express = require('express'); // Import the Express framework
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Import MongoDB client and related utilities
const path = require('path'); // Import Node.js path module for handling file paths

const app = express(); // Initialize the Express application
const PORT = 3000; // Define the port the server will listen on

// Construct the MongoDB connection URI using an environment variable for the password
const URI = `mongodb+srv://kobeberckmans:${process.env.MONGODB_PASSWORD}@cluster1.tpiy3cp.mongodb.net/course_project?retryWrites=true&w=majority`;

// Create a new MongoClient instance with server API settings
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    console.log('Attempting to connect...');
    await client.connect(); // Connect to MongoDB
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Connection failed:', error.message); // Log connection errors
  }
})();

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets'))); // Serve static files from the 'src/assets' directory
app.use(express.static(path.join(__dirname, '..'))); // Serve other static files from the parent directory

// GET endpoint to retrieve all records from the 'strava' collection
app.get('/api/strava', async (req, res) => {
  try {
    const database = client.db('Course_Project'); // Access the database
    const collection = database.collection('strava'); // Access the 'strava' collection
    const data = await collection.find({}).toArray(); // Fetch all documents
    res.json(data); // Send the data as a JSON response
  } catch (error) {
    console.error('Error fetching data:', error); // Log errors
    res.status(500).send('Error fetching data'); // Send a 500 error response
  }
});

// PUT endpoint to update a record in the 'strava' collection
app.put('/api/strava', async (req, res) => {
  const updateData = req.body; // Get the data to update from the request body

  try {
    const database = client.db('Course_Project'); // Access the database
    const collection = database.collection('strava'); // Access the 'strava' collection

    // Prepare the fields to update, excluding undefined values and the '_id' field
    const updateFields = Object.entries(updateData)
      .filter(([key, value]) => value !== undefined && key !== '_id')
      .reduce((fields, [key, value]) => {
        fields[key] = value;
        return fields;
      }, {});

    const result = await collection.updateOne(
      { _id: new ObjectId(updateData._id) }, // Match the document by its '_id'
      { $set: updateFields } // Update the specified fields
    );

    if (result.modifiedCount === 1) {
      res.status(200).send('Data successfully updated'); // Send success response
    } else {
      res.status(404).send('No matching record found'); // Send not found response
    }
  } catch (error) {
    console.error('Error updating data:', error); // Log errors
    res.status(500).send('Error updating data'); // Send a 500 error response
  }
});

// DELETE endpoint to delete a record from the 'strava' collection
app.delete('/api/strava', async (req, res) => {
  try {
    const database = client.db('Course_Project'); // Access the database
    const collection = database.collection('strava'); // Access the 'strava' collection
    const { _id } = req.body; // Get the '_id' of the document to delete

    const result = await collection.deleteOne({ _id: new ObjectId(_id) }); // Delete the document

    if (result.deletedCount === 1) {
      res.status(200).send('Activity successfully deleted'); // Send success response
    } else {
      res.status(404).send('No matching record found'); // Send not found response
    }
  } catch (error) {
    console.error('Error deleting activity:', error); // Log errors
    res.status(500).send('Error deleting activity'); // Send a 500 error response
  }
});

// POST endpoint to add a new record to the 'strava' collection
app.post('/api/strava', async (req, res) => {
  try {
    const database = client.db('Course_Project'); // Access the database
    const collection = database.collection('strava'); // Access the 'strava' collection

    const newActivity = req.body; // Get the new activity data from the request body
    const result = await collection.insertOne(newActivity); // Insert the new document

    if (result.acknowledged) {
      res.status(201).json({ message: 'Activity added successfully', id: result.insertedId }); // Send success response with the new document ID
    } else {
      res.status(400).send('Failed to add activity'); // Send failure response
    }
  } catch (error) {
    console.error('Error adding activity:', error); // Log errors
    res.status(500).send('Error adding activity'); // Send a 500 error response
  }
});

// GET endpoint to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html')); // Send the index.html file as a response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Log the server URL
});
