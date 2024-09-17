const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors({
  origin: ['http://localhost:5173/','https://nimble-sorbet-dddb99.netlify.app/'],
  credentials:true,
  }
))
app.use(express.json())




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hhelgf3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const database = client.db("dcit");
    const newContact = database.collection("newContact");

    app.get('/users', async(req,res)=>{
      const cursor = newContact.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/users', async(req,res)=>{
      const user = req.body;
      console.log('new user', user)
      
      const result = await newContact.insertOne(user);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req, res) =>{
    res.send('dcit is running')
})

app.listen(port, ()=>{
    console.log(`dcit server port ${port}`)
})