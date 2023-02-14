const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const videosExample=require("./exampleresponse.json");
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


// GET "/"
app.get("/", (req, res) => {
    res.json(videosExample);
});

//POST
app.post("/", (req, res) => {
  if(req.body.title==="" || req.body.url===""){
    res.status(400).json({message : "Please fill all the fields"})
    return;
  }
  let maxId=Math.max(...videosExample.map(ele=>ele.id))
  const newVideos={
    "id": maxId +1,
    "title":req.body.title,
    "url":req.body.url,
    "rating" :0
  }
  videosExample.push(newVideos)
  res.status(201).json(newVideos)
});

app.get("/:id", (req, res) => {
  const id=Number(req.params.id)
  const find=videosExample.find(ele=>ele.id===id)
  if(find){
    res.status(200).json({find})
  }else res.status(404).json({message:"not found"})
});

app.delete("/:id",(req,res)=>{
  let id=Number(req.params.id)
  let result=videosExample.filter(ele=>ele.id!==id)
  if(result){
    res.json({})
  }else{
    res.json({ message: "Video could not be deleted" });
  }
  
})
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));