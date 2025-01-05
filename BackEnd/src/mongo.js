const {
    MongoClient
} = require("mongodb");


const uri = "mongodb+srv://barrybbeeebenson:2025Bitch@cluster0.eocdgpz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('JustLilGuys');
        const smiskis = database.collection('Smiskis');

        const query = {
            'name': 'Listening',
            "inCollection": false,
            'description': 'Curious about the sounds coming in from next door, this Smiski is always listening in.',
            'picture': '../assets/images/series2/6.png',
            'series': 'Series 2'

        };

        
        const smiski = await smiskis.insertOne(query);
        console.log(smiski);
    } finally {

        await client.close();
    }
}
run().catch(console.dir);