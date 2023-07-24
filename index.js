const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//  ujAdUPrAxJe..mm440   campusConnect


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://campusConnect:ujAdUPrAxJe..mm440@cluster0.lyu30gb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        const menuCollection = client.db('campusConnect').collection('collegeName')
        const reviewsCollection = client.db('campusConnect').collection('reviews')

        app.get('/name', async (req, res) => {
            res.send(await menuCollection.find().toArray())
        });


        app.get('/reviews', async (req, res) => {
            res.send(await reviewsCollection.find().toArray())
        });

        app.get('/name/:id', async (req, res) => {
            const paramsId = req.params.id;
            console.log(paramsId)

            const objectId = new ObjectId(paramsId)
            const querey = { _id: objectId }

            res.send(await menuCollection.find(querey).toArray())
        });

        app.post('/admission/submit', async (req, res) => {
            const candidateData = req.body;
            console.log(candidateData);
        })

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});