const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const exampleResponse = require('./exampleresponse.json');
const app = express();
const port = process.env.PORT || 5002;
const { query } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.User,
  host: process.env.Host,
  database: process.env.Database,
  password: process.env.Password,
  port: process.env.DatabasePort,
});


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = exampleResponse;

// GET "/"
// app.get('/', (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   //res.send({ express: 'Your Backend Service is Running' });
//   res.send(videos);
// });

//This endpoint is used to add a video to the API
app.post('/POST', (req, res) => {

  const newVideo = {
    videoId: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    status: 'active'
  }

  if(!newVideo.title || !newVideo.url){
       return res.status(400).json({ message:`Video could not be saved`});
    }

    videos.push(newVideo);
    res.send(videos);
});

//Returns the video with the ID contained within the `{id}` parameter

app.get('/:id', (req, res) => {
  const foundVideo = videos.find(video => video.id === parseInt(req.params.id));
  if(foundVideo){
    res.send(foundVideo)
  }else {
    res.status(404).send({ message: 'video not found'});
  }
});

//Deletes the video with the ID container within the `{id}` parameter

app.delete('/:id', (req, res) => {
  const positionVideo = videos.findIndex(video => video.id === parseInt(req.params.id));
  if(positionVideo === -1) {
    res.status(400).send({ message: 'Video could not be deleted'})
  } else {
    videos.splice(positionVideo, 1)
    res.status(200).send({ success: true })
  }
});

//sort video asc or desc
app.get('/', (req, res) => {
  let order = req.query.order;

  if(order === 'asc') {
    res.send(videos.sort((a,b) => a.rating - b.rating, 0));
  }else if(order === 'desc' || order === ""){
    res.send(videos.sort((a,b) => b.rating - a.rating, 0));
  }else {
    res.send(videos);
  }
  
})


app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/hotels', function (req, res) {
  const newHotelName = req.body.name;
  const newHotelRooms = req.body.rooms;
  const newHotelPostcode = req.body.postcode;

 // import exampleresponse from exampleresponse.json;

  if (!Number.isInteger(newHotelRooms) || newHotelRooms <= 0) {
    return res
      .status(400)
      .send('The number of rooms should be a positive integer.');
  }

  pool
    .query('SELECT * FROM hotels WHERE name=$1', [newHotelName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send('An hotel with the same name already exists!');
      } else {
        const query =
          'INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)';
        pool
          .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
          .then(() => res.send('Hotel created!'))
          .catch((error) => {
            console.error(error);
            res.status(500).json(error);
          });
      }
    });
});
