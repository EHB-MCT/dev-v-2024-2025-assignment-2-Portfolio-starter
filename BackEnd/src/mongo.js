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
            'serie': '@ Work',
            'name': 'Group Think',
            "inCollection": 'No',
            'description': 'SMISKI are deliberating in the meeting. They think that three heads are better than one!',
            'picture': './assets/images/work6.png'

        };

        
        const smiski = await smiskis.insertOne(query);
        console.log(smiski);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);