const express = require("express");
const cors = require("cors");
const mongoose = require("./db/mongo");
const encountersRoute = require("./routes/encounters");

const app = express();
const port = 3000;

// Using JSON middleware
app.use(express.json());

// Activate CORS
app.use(cors());

// Added encounters route
app.use("/api", encountersRoute);

// Start the server
app.listen(port, () => {});
