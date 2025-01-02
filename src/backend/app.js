const express = require('express');
const encountersRoute = require('./routes/encounters');

const app = express();
const port = 3000;

// Using JSON middleware
app.use(express.json());

// Added encounters route
app.use('/api', encountersRoute);

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
