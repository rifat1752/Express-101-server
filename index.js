const express =require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;




const uri = "mongodb+srv://express-101:KOP4AR5LQq9Ayro0@cluster0.zwkgffp.mongodb.net/?retryWrites=true&w=majority";

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
//post operation
   const userCollection = client.db("userDB").collection("users");
    app.post("/users",async(req,res)=>{
        const user = req.body;
        console.log(user);
        result = await userCollection.insertOne(user)
        console.log(result);
        res.send(result);
    })  
//delete

app.delete("/users/:id",async(req,res)=>{
  const id = req.params.id;
  console.log("id: ", id);
  const query = {
    _id : new ObjectId(id),
  }
  const result = await userCollection.deleteOne(query);
  res.send(result);
})

//update 
app.get("/users/:id",async(req,res)=>{
  const id = req.params.id;
  console.log("id: ", id);
  const query = {
    _id : new ObjectId(id),
  }
  const result = await userCollection.findOne(query);
  res.send(result);
})


app.put("/users/:id",async(req,res)=>{
const id =req.params.id;
const data = req.body;

const filter = {
  _id : new ObjectId(id)
}
const options = {upsert:true};
const updatedData = {
  $set:{
    name:data.name,
    email:data.email,
    password:data.password,
  },
};
const result = await userCollection.updateOne(filter,updatedData,options);
res.send(result);
})
//read operation
    app.get("/users",async (req,res) => {
        const result = await userCollection.find().toArray();
        console.log(result);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    
  }
}
run().catch(console.dir);






app.get("/",(req,res)=>{
    res.send("crud is running...");
})
app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})