const express = require("express");
const router = express.Router();
const  {Pool}= require('pg');
const dotenv = require('dotenv');
dotenv.config();
const {moment} = require('moment')


const pool = new Pool({

  connectionString: process.env.DATABASE_URL,
  ssl: {
  rejectUnauthorized: false
  }
})


router.get("/", function (req, res) {
  pool.query('SELECT * FROM videos' )
  .then ((result)=>res.json(result.rows))
  .catch((error)=>{
      console.log(error)
      res.status(500).json(error);
  })
});

router.get("/:id", function (req, res) {
  let paramId = req.params.id;
  pool.query('SELECT * FROM videos WHERE id=$1', [paramId] )
  .then ((result)=>res.json(result.rows))
  .catch((error)=>{
      console.log(error)
      res.status(500).json(error);
  })
});

router.post("/", function (req, res) {
  let  {title,video_id,categories,isFavorite,votes}=req.body;
  let  newData = moment().format('YYYY-MM-DD HH:mm:ss')
  for (let key in req.body) {
    if (!req.body[key]) {
      return res.status(400).send("Please fill in all the details");
    }
  }
  
  pool
    .query(
      "INSERT INTO videos (title, video_id, categories, isFavorite, votes, created_date) VALUES ($1,$2,$3,$4,$5,$6)",
      [ title,video_id,categories,isFavorite,votes,newData]
    )
    .then(() => res.send("Successful" ))
    .catch((error) => console.log(error));
});

//DELETE REQUEST
router.delete("/:id", function (req, res) {
  let paramId = req.params.id;
  pool.query('DELETE FROM videos WHERE id = $1', [paramId])  
  .then (()=>res.send(`Video ${paramId} deleted`))
  .catch((error)=>{
      console.log(error)
      res.status(500).json(error);
  })
});

//PUT REQUEST
router.put("/:id", function (req, res) {
  let paramId = req.params.id;
  let  {title,video_id,categories,isFavorite,votes}=req.body;
  pool.query('UPDATE videos SET title =$1, video_id= $2, categories=$3, isFavorite=$4, votes =$5 WHERE id = $6',
            [title,video_id,categories,isFavorite,votes,paramId])  
  .then (()=>{
        res.json( `Video ${paramId} updated`)
        console.log( `Video ${paramId} updated`)
  }
        )
  .catch((error)=>{
        console.log(error)
        res.status(500).json(error);
})
});

module.exports = router;