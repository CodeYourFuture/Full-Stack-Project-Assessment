const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// const videosExample=require("./exampleresponse.json");
const cors = require("cors");
const {Pool} =require("pg")

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

const db= new Pool({
  host:"localhost",
  port:5432,
  user:"postgres",
  password:"leila6925",
  database:"cyf-video-management"
})
// GET "/"
app.get("/", (req, res) => {
    db.query("select * from videos",(err,result)=>{
      res.json(result.rows);
    })
});

//POST
app.post("/", async (req, res) => {
  const { title, url } = req.body;
  let rating ;
  try {
    const queryText =
      "INSERT INTO videos (title, url,rating) VALUES ($1, $2,$3) RETURNING id";
    const result = await db.query(queryText, [title, url,rating]);
    const newVideoId = result.rows[0].id;
    res.status(201).json({
        success: true,
        message: "Video added successfully",
        id: newVideoId,
              });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while adding the video",
      });
  }
});

app.put("/:id/upVote", async(req,res)=>{
  const videoId=Number(req.params.id);
  try {
    await db.query("UPDATE videos SET rating=(rating + 1) WHERE id=$1" ,[videoId]);
    res.json()
  } catch (error) {
    
  }
})
app.put("/:id/downVote" , async(req,res)=>{
  const videoId=Number(req.params.id);
  try {
        await db.query("UPDATE videos SET rating=(rating - 1) WHERE id=$1", [videoId]);
        res.json()
  } catch (error) {
    
  }
})
app.get("/:id", async(req, res) => {
  const id=Number(req.params.id)
  await db.query("SELECT * FROM videos WHERE id=$1",[id]);
  
  
});

app.delete("/:id",async(req,res)=>{
  let id=Number(req.params.id)
  try {
    await db.query("DELETE from videos where id=$1",[id])
    res.json()
  } catch (error) {
    
  }
  
})
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));