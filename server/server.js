//Start a server 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');



// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Connect to the database 
const videos = require('.///exampleresponse.json')


// // Create a pool
const pool = new Pool({
  user: 'davidandtiana',
  host: 'localhost',
  database: 'exampleresponse.json',
  password: 'password',
  port: 5432,
});

//200 
//GET all videos from the database 
app.get('/videos', (req, res) => {
//if successful, send back the videos or else send back an error 
res.status(200).send({ success: true, videos: videos });
});


//Get {id} from the database return the video with the id contained within the 'id' parameter
app.get('/videos/:id', (req, res) => {
const { id } = req.params;
console.log(id);
const video = videos.filter((video) => video.id === parseInt(id));
if (video.length === 0) {
  res.status(404).send({ success: false, error: 'Video not found' });
} else {
  res.status(200).send({ success: true, video: video[0] });
}
});


// DELETE {id} from the database Delete the video with the id contained within the 'id' parameter 
app.delete('/videos/:id', (req, res) => {
const { id } = req.params;
const video = videos.filter((video) => video.id === parseInt(id));
if (video.length === 0) {
  res.status(404).send({ success: false, error: 'Video could not be deleted' });
} else {
  videos.splice(videos.indexOf(video[0]), 1);
  res.status(200).send({ success: true, videos: videos });
}
});




//299 
// get ordered data return /?order=asc or /?order=desc when recive a 'asc' the videos should be returned in ascending order and when recive a 'desc' the videos should be returned in descending order
app.get('/videos/:order', (req, res) => {
    const { order } = req.params;
    if (order === 'asc') {
      res.status(200).send({ success: true, videos: videos.sort((a, b) => a.id - b.id) });
    } else {
      res.status(200).send({ success: true, videos: videos.sort((a, b) => b.id - a.id) });
    }
  });
    
  
  






// //404 
app.get('/*', (req, res) => {
  res.status(404).send({ success: false, error: 'Page not found' });
});



const port = process.env.PORT || 4000;

// app.listen 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}
);

