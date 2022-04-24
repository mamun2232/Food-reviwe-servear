const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middalewire 
app.use(cors())
app.use(express.json())

// user : foodMamun
// passs: JGeGtuJaJ6Vg43PM


const uri = "mongodb+srv://foodMamun:JGeGtuJaJ6Vg43PM@cluster0.jrvob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
      try{
            await client.connect();
            const reviewCollection = client.db("FoodReview").collection("review");

            // read api
            app.get('/review' , async (req , res)=>{
                  const query = {}
                  const cursor = reviewCollection.find(query)
                  const result = await cursor.toArray()
                  res.send(result)
            }) 

            // post api 
            app.post('/review' , async (req , res)=>{
                  const comment = req.body
                  console.log(comment);
                  const result = await reviewCollection.insertOne(comment)
                  res.send(result)
            })




            // update api 

            // delete api 

            app.delete('/review/:id', async (req , res) =>{
                  const id = req.params.id
                  console.log(id);
                  const query = {_id : ObjectId(id)}
                  const result = await reviewCollection.deleteOne(query)
                  res.send(result)
            })

      }

      finally{
            // await client.close(); 

      }
}





run().catch(console.dir);






app.get('/', (req, res) => {
      res.send('Hello World!')
})

app.listen(port, () => {
      console.log(`listening on port`, port)
})