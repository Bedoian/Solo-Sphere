const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000;
const app = express()


// middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxt94sc.mongodb.net/?appName=Cluster0`;

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
    const jobCollection = client.db('soloSphere').collection('jobs')
    const bidCollection = client.db('soloSphere').collection('bids')
    // find multyple data
    app.get('/jobs', async (req, res) => {
      const result = await jobCollection.find().toArray()
      res.send(result)
    })

    app.get('/jobs/:email', async (req, res) => {
      const email = req.params.email
      const query = { buyer_email: email }
      const result = await jobCollection.find(query).toArray()
      res.send(result)
    })

    // find single data
    app.get('/job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobCollection.findOne(query)
      res.send(result)
    })
    // delete an item
    app.delete('/job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobCollection.deleteOne(query)
      res.send(result)
    })
    // update a job in db
    app.put('/job/:id', async (req, res) => {
      const id = req.params.id
      const jobData = req.body
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc={
        $set:{
          ...jobData,
        }
      }
      const result=await jobCollection.updateOne(query,updateDoc,options)
      res.send(result)
    })
    // post 
    app.post('/bid', async (req, res) => {
      const bidData = req.body;
      const result = await bidCollection.insertOne(bidData)
      res.send(result)
    })
    app.post('/jobs', async (req, res) => {
      const jobData = req.body;
      const result = await jobCollection.insertOne(jobData)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('hello from thee solosphere server...')
})
app.listen(port, () => {
  console.log(`Server is runnging on the port ${port}`)
})