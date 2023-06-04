const dotenv =require("dotenv");
dotenv.config();



const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const videoList =require('./DBConfig');

let videos = [];

// GET "/"
app.get("/", (req, res)=>{
  res.send('Welcome to Island Tony');
})

app.get("/videos", (req, res) => {
  
  const sorting = req.query.sorting || null;
  let query = "SELECT * FROM videos";
  if (sorting) {
    query += `ORDER BY rating ${sorting.toUpperCase()}`;
  }
videoList.query(query).then((result)=> {
  if(result.rowCount === 0) {
    res.status(400).json({error: "No Videos to List"});
  } else {
    return res.status(200).json(result.rows);
  }
});

});

app.get("/videos/:id", (req,res) => {
  const videosId = parseInt(req.params.id);
  const eachVideo= "SELECT * FROM videos WHERE id=$1";
  videoList.query(eachVideo, [videosId]).then((result)=>{
    if(result.rowCount === 0) {
    res.status(400).json({message: `Video ${videosId} not found`});
  } else {
    return res.status(200).json(result.rows);
  }
  })  
});

app.delete('/videos/:id', function (req, res) {
  const videosId = parseInt(request.params.id);
  const eachVideo = "DELETE FROM videos WHERE id = $1";
videoList.query(eachVideo, [videosId]).then(()=>res.status(200).json({message:`Video ${videosId} deleted`})).catch((error)=> console.log(error));
});

app.post('/videos', async(req, res)=> {
  try {
    const newTitle = req.body.title;
    const newURL = req.body.url;
    const postQuery = `INSERT INTO videos(id,title,url,rating,date) VALUES ($1,$2,$3,$4,$5)`;
    const getQuery=`SELECT 1 FROM videos WHERE url=$1`;
    const randomID = Math.floor(100000+Math.random()*900000);
    const randomRating=Math.floor(100+Math.random()*900);
    const postDate = newDate().toLocaleString();
    const word=youtube;
    const result = await videoList.query(postQuery, [randomID, newTitle, newURL, randomRating, postDate,]);
    res.status(200).json({message:"New Video added"});
  } catch (error) {res.json(error);}
});
app.listen(port,()=>console.log(`Listening on port ${port}`));