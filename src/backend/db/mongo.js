const mongoose = require("mongoose");

// Connection string from MongoDB Atlas
const connectionString =
	"mongodb+srv://rachellevanuden:1234@sharedcluster.8uk56.mongodb.net/DPSMeter?retryWrites=true&w=majority&appName=SharedCluster";

// Connect to MongoDB
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

// Logging for debugging
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {});

module.exports = mongoose;
