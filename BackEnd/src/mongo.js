const {
    MongoClient
} = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://barrybbeeebenson:2025Bitch@cluster0.eocdgpz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('JustLilGuys');
        const smiskis = database.collection('Smiskis');

        const query = {
            'name': 'Hugging Knees',
            "inCollection": false,
            'description': 'Always in the corner hugging onto the knees, staring out into the distance pensive in thought.',
            'picture': './assets/images/series1_1.png',
            'series': 'Series 1'

        };

        
        const smiski = await smiskis.insertOne(query);
        console.log(smiski);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);