const express = require("express");
const dotenv =require("dotenv");
const {Pool}= require ("pg");

dotenv.config();

const db = new Pool({
  connectionString: process.env.db_url,
  ssl: { rejectUnauthorized: false }
});

db.connect();
const app = express();
const port = process.env.PORT || 5005;
app.use(express.json());


// GET "/"
app.get("/", (req, res)=>{
  res.send('Welcome to Island Tony');
})


app.get("/videos", (req, res) => {
 
  const sorting = req.query.sorting || null;
      const sqlQuery = "SELECT * FROM videos";
  if (sorting) {
    sqlQuery += `ORDER BY rating ${sorting.toUpperCase()}`;
  }
   db.query(sqlQuery)
.then((result)=> {
  if(result.rowCount === 0) {
    res.status(400).json({error: "No Videos to List"});
    return;
  } else {
     res.status(200).json(result.rows);
     return;
  }})
.catch((err)=>console.error(err));
});

app.get("/videos/:id", (req,res) => {
  const videosId = parseInt(req.params.id);
  const eachVideo= "SELECT * FROM videos WHERE id=$1";
  db.query(eachVideo, [videosId])
  .then((result)=>{
    if(result.rowCount === 0) {
    res.status(400).json({message: `Video ${videosId} not found`});
  } else {
     res.status(200).json(result.rows);
  }
  })  
});


app.delete('/videos/:id', function (request, res) {
  const videosId = parseInt(request.params.id);
  const eachVideo = "DELETE FROM videos WHERE id = $1";
db.query(eachVideo, [videosId])
.then(()=>res.status(200).json({message:`Video ${videosId} deleted`}))
.catch((error)=> console.log(error));
});


app.post('/videos', async(req, res)=> {
  try {
    const {title,url} = req.body;
    const postQuery = "INSERT INTO videos(title,url,rating,date) VALUES ($1,$2,$3,$4)";
    const postDate = new Date().toLocaleString();
    const result = await db.query(postQuery, [title,url, 0, postDate]);
    res.status(200).json({message:"New Video added"});
  } catch (error) {res.json(error);}
});

app.listen(port,()=>console.log(`Listening on port ${port}`));