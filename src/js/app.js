require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;
const URI = `mongodb+srv://kobeberckmans:${process.env.MONGODB_PASSWORD}@cluster1.tpiy3cp.mongodb.net/course_project?retryWrites=true&w=majority`;

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
    await client.connect();
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
})();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));
app.use(express.static(path.join(__dirname, '..')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const database = client.db('Course_Project');
    const users = database.collection('users');

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const result = await users.insertOne({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const database = client.db('Course_Project');
    const users = database.collection('users');

    const user = await users.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/strava', requireAuth, async (req, res) => {
    try {
        const database = client.db('Course_Project');
        const collection = database.collection('strava');
        const data = await collection.find({ userId: req.session.userId.toString() }).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.put('/api/strava', requireAuth, async (req, res) => {
  const updateData = req.body;

  try {
    const database = client.db('Course_Project');
    const collection = database.collection('strava');

    const updateFields = Object.entries(updateData)
      .filter(([key, value]) => value !== undefined && key !== '_id')
      .reduce((fields, [key, value]) => {
        fields[key] = value;
        return fields;
      }, {});

    const result = await collection.updateOne(
      { _id: new ObjectId(updateData._id), userId: req.session.userId },
      { $set: updateFields }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send('Data successfully updated');
    } else {
      res.status(404).send('No matching record found');
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data');
  }
});

app.delete('/api/strava', requireAuth, async (req, res) => {
  try {
    const database = client.db('Course_Project');
    const collection = database.collection('strava');
    const { _id } = req.body;

    const result = await collection.deleteOne({
      _id: new ObjectId(_id),
      userId: req.session.userId
    });

    if (result.deletedCount === 1) {
      res.status(200).send('Activity successfully deleted');
    } else {
      res.status(404).send('No matching record found');
    }
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).send('Error deleting activity');
  }
});

app.post('/api/strava', requireAuth, async (req, res) => {
    try {
        const database = client.db('Course_Project');
        const collection = database.collection('strava');
        const newActivity = { 
            ...req.body, 
            userId: req.session.userId.toString(),
            createdAt: new Date()
        };
        const result = await collection.insertOne(newActivity);
        
        if (result.acknowledged) {
            res.status(201).json({ message: 'Activity added successfully', id: result.insertedId });
        } else {
            res.status(400).send('Failed to add activity');
        }
    } catch (error) {
        console.error('Error adding activity:', error);
        res.status(500).send('Error adding activity');
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});