const express = require('express');
const db = require('../db/db'); 
const router = express.Router();

// Endpoint to fetch character data
router.get('/encounters', (req, res) => {
    try {
        const query = `
            SELECT
                name,
                encounter_id AS encounterId,
                class AS className,
                gear_score AS gearScore,
                dps
            FROM entity
        `;
        const encounters = db.prepare(query).all(); 
        res.json(encounters);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Failed to fetch encounter data" });
    }
});

module.exports = router;
