const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const pool = require('./db');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("./exampleresponse.json");

// GET "/"
app.get('/videos',async(req,res) =>{

  
  try {
    
      const allVideos = await pool.query('SELECT * FROM videos ');
      res.json( allVideos.rows );
  } catch (error) {
      console.error(err.message);
  }

})


app.post('/videos', async(req,res) =>{
  try {
      const {title, url,vating} =req.body;
      const newVideo =await pool.query("INSERT INTO videos (title,url,vating) VALUES ($1, $2, $3) RETURNING *", [title,url,vating] ) 
         res.json(newVideo.rows[0]);
    } catch (err) {
      console.error(err.message);
      
  }
})


app.get('/videos/:id',async(req,res) =>{
  try {
      const { id } = req.params;
      const video = await pool.query('SELECT * FROM videos WHERE video_id=$1', [id]);
      res.json(video.rows[0]);
  } catch (error) {
      console.error(err.message);
  }

})



  app.delete('/videos/:id',async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteVideo = await pool.query('DELETE FROM videos WHERE video_id=$1', [id]);
        res.json('Video was deleted!...');
    } catch (error) {
        console.error(err.message);
    }

})


    // app.put("/videos/:id",(req, res) => {
    //   const { id } = req.params;
    //   const findIndex = videos.findIndex(video => video.id === id);
    
    //   if(findIndex ===-1){
    //     res.json({
    //       result: "failure",
    //       message: "No videos found",
    //     });
    //     return;
    //   }else{
    //     videos[findIndex].title = req.body.title;
    //     videos[findIndex].url = req.body.url;
    //     videos[findIndex].rating = req.body.rating;

    //   }  
      
    // res.send (`Video  has been edited successfully `)
    //   })
  


    app.put('/videos/:id', async(req,res) =>{
      try {
        const { id } = req.params;
          const {title, url,vating} =req.body;
          const updateVideo =await pool.query("UPDAtE videos SET title =$1, url=$2, vating=$3 Where video_id=$4 RETURNING *", [title,url,vating,id] ) 
             res.json(updateVideo.rows[0]);
        } catch (err) {
          console.error(err.message);
          
      }
    })
    



app.listen(port, () => console.log(`Listening on port ${port}`));
