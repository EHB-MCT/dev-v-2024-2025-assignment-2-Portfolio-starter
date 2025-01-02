const Database = require('better-sqlite3');
const path = require('path');

// Path to the encounters.db locally
const dbPath = path.resolve('C:/Users/Rachelle/AppData/Local/LOA Logs/encounters.db');

// Creation connection to database
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;
