const express = require("express");
const Encounter = require("../models/Encounter");
const router = express.Router();

// Endpoint to fetch character data
router.get("/encounters", async (req, res) => {
	try {
		const encounters = await Encounter.find(); // Fetch all encounters from MongoDB
		res.json(encounters);
	} catch (err) {
		console.error("Error fetching encounters:", err.message);
		res.status(500).send("Error fetching encounter data.");
	}
});

// Endpoint to add a new encounter
router.post("/encounters", async (req, res) => {
	try {
		const newEncounter = new Encounter(req.body); // Make new encounter
		const savedEncounter = await newEncounter.save(); // Save in database
		res.status(201).json(savedEncounter);
	} catch (err) {
		console.error("Error saving encounter:", err.message);
		res.status(500).send("Error saving encounter data.");
	}
});

module.exports = router;
