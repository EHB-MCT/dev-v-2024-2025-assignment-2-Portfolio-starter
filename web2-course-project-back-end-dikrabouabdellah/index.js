const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.FINAL_URL);
const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(cors());

//root
app.get("/", (req, res) => {
	res.status(200).send("Welcome to my root");
});

//return all gemRecs from the database

app.get("/gemRecs", async (req, res) => {
	try {
		//connect to db
		await client.connect();

		//retreive the GemRecs collection data
		const colli = client.db("WEB2-courseproject-Dikra-Bouabdellah").collection("GemRecs");
		const gemRec = await colli.find({}).toArray();
		//send back the data with the response
		res.status(200).send(gemRec);
	} catch (error) {
		console.error("Error fetching GemRecs:", error);
		res.status(500).send({
			error: "something went wrong",
			value: error,
		});
	} finally {
		await client.close();
	}
});

// /gemrec?id=1
app.get("/gemRec", async (req, res) => {
	//id is located in the query: req.query.id
	try {
		//connect to db
		await client.connect();

		//retreive the GemRecs collection data
		const colli = client.db("WEB2-courseproject-Dikra-Bouabdellah").collection("GemRecs");

		//only look for gemRec with this ID
		const query = { grid: req.query.id };

		const gemRec = await colli.findOne(query);

		if (gemRec) {
			//send back the file
			res.status(200).send(gemRec);
			return;
		} else {
			res.status(400).send("gemRec could not be found with id: " + req.query.id);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "something went wrong",
			value: error,
		});
	} finally {
		await client.close();
	}
});

//save a GemRec
app.post("/saveGemRec", async (req, res) => {
	if (!req.body.grid || !req.body.name || !req.body.genre || !req.body.aired || !req.body.score || !req.body.episode || !req.body.GemRec || !req.body.summary || !req.body.image || !req.body.watch) {
		res.status(400).send("Bad request: missing informations");
		return;
	}

	try {
		//connect to db
		await client.connect();

		//retreive the GemRecs collection data
		const colli = client.db("WEB2-courseproject-Dikra-Bouabdellah").collection("GemRecs");

		//validation for double gemRec
		const gemRec = await colli.findOne({ grid: req.body.grid });
		if (gemRec) {
			res.status(400).send("Bad request: gemRec already exists with id " + req.body.grid);
			return;
		}

		//create a new gemRec object
		let newGemRec = {
			grid: req.body.grid,
			name: req.body.name,
			genre: req.body.genre,
			aired: req.body.aired,
			score: req.body.score,
			episode: req.body.episode,
			GemRec: req.body.GemRec,
			summary: req.body.summary,
			image: req.body.image,
			watch: req.body.watch,
		};

		//insert into the database
		let insertResult = await colli.insertOne(newGemRec);

		//send back succesmessage
		res.status(201).send(`gemRec succesfully saved with id ${req.body.grid}`);
		return;
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "something went wrong",
			value: error,
		});
	} finally {
		await client.close();
	}
});

app.listen(port, () => {
	console.log(`API is running at port http://localhost:${port}`);
});
