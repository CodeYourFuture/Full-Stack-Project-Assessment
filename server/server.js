const express = require("express");
const app = express();
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())


app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [ {
  "id": 562824,
  "title": "Cracking Enigma in 2021 - Computerphile",
  "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
  "rating": 111
},
{
  "id": 442452,
  "title": "Coding Adventure: Chess AI",
  "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
  "rating": 671
},];

// GET "/"
app.get("/videos", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.json( videos);
});

//POST "/"

app.post("/videos",(req,res)=>{
  const {title,url}=req.body;
  const newobj={
    url:url,
    title:title
  }
  videos.push(newobj)
  res.send(videos)
})

app.get("/videos/:id",(req,res)=>{
  const id =+req.params.id
  const itemFind= videos.find(video=>video.id===id)
  if(itemFind){res.status(200).send(itemFind)}
  else{res.status(404).send('Video not found')}
})
app.delete("/videos/:id",(req,res)=>{
  const id =+req.params.id;
  const deletedItem=videos.filter((video)=>video.id!==id)
  if(deletedItem.length>0){res.send(deletedItem)}
  else{res.status(404).send('It is not exist')}
})