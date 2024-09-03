const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 9000;
const app = express()


// middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
   'https://solosphere-65bea.web.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(cookieParser())

const verifyToken = (req, res, next) => {
  // console.log('i am a middleman')
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: 'unauthorized token' })
  if (token) {
    jwt.verify(token, process.env.JWT_WEB_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: 'unauthorized token' })
      }
      // console.log(decoded)
      req.user = decoded
    })
  }
  // console.log(token);
  next()
}

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
    // jwt generate
    app.post('/jwt', async (req, res) => {
      const email = req.body
      const token = jwt.sign(email, process.env.JWT_WEB_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })
    // delete  cookie
    app.get('/logout', (req, res) => {
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: 0,
        })
        .send({ successDelete: true })
    })
    const jobCollection = client.db('soloSphere').collection('jobs')
    const bidCollection = client.db('soloSphere').collection('bids')
    // find multyple data
    app.get('/jobs', async (req, res) => {
      const result = await jobCollection.find().toArray()
      res.send(result)
    })

    app.get('/jobs/:email', verifyToken, async (req, res) => {
      const email = req.params.email
      const tokendata = req.user;
      // console.log(tokendata,'from get hente');
      if (tokendata.email !== email) return res.status(403).send({ message: 'forbidden access' })
      const query = { 'buyer.email': email }
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
      const updateDoc = {
        $set: {
          ...jobData,
        }
      }
      const result = await jobCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })

    app.post('/jobs', async (req, res) => {
      const jobData = req.body;
      const result = await jobCollection.insertOne(jobData)
      res.send(result)
    })

    // all operation for bidCollection
    app.get('/myBids/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const result = await bidCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/bidReq/:email', async (req, res) => {
      const email = req.params.email;
      const query = { 'buyer.email': email }
      const result = await bidCollection.find(query).toArray()
      res.send(result)
    })
    // patch
    app.patch('/bid/:id', async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: status
      }
      const result = await bidCollection.updateOne(query, updateDoc)
      res.send(result)
    })
    // post 
    app.post('/bid', async (req, res) => {
      const bidData = req.body;
      const query = {
        email: bidData.email,
        job_id: bidData.job_id
      }
      const alreadyApplied = await bidCollection.findOne(query)
      console.log(alreadyApplied)
      if (alreadyApplied) {
        return res
          .status(400)
          .send('You cannot bid more then one time in a single sercular')
      }
      const result = await bidCollection.insertOne(bidData)
      res.send(result)
    })
  

    // for pagination 
    app.get('/all-jobs', async (req, res) => {
      const size = parseInt(req.query.size)
      const page = parseInt(req.query.page)-1
      const filter=req.query.filter;
      const sort=req.query.sort;
      const search=req.query.search;

      let query={
        job_title:{$regex:search,$options:'i'},
      }
      if(filter) query={category:filter}

      let options={}
      if(sort) options={sort:{deadline:sort==='asc'?1:-1}}
      const result = await jobCollection
        .find(query,options)
        .skip(size*page)
        .limit(size)
        .toArray()
      res.send(result)
    })

      // for count
      app.get('/jobs-count', async (req, res) => {
        const filter=req.query.filter;
        const search=req.query.search;
        let query={
          job_title:{$regex:search,$options:'i'},
        }
        if(filter)query={category:filter}
        const count = await jobCollection.countDocuments(query)
        res.send({ count })
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