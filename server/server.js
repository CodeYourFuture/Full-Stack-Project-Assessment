const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const uuid = require("uuid");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// const pool = new Pool({
//   user: 'eekhljmwtumkzw',
//   host: 'ec2-54-228-139-34.eu-west-1.compute.amazonaws.com',
//   database: 'drgdq67t8dlo4',
//   password: '375a5b9ef9cf477752aecf214a42d6d31375668b897ee1d4687ab1f94417e966',
//   port: 5432
// })

// cd Documents/CYF/Full-Stack-Project-Assessment
const port = process.env.PORT || 5000;

const pool = new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
app.listen(port, () => console.log(`Listening on port ${port}`));



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//   {
//     "id": 523523,
//     "title": "Never Gonna Give You Up",
//     "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     "rating": 23
//   },
//   {
//     "id": 523427,
//     "title": "The Coding Train",
//     "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     "rating": 230
//   },
//   {
//     "id": 82653,
//     "title": "Mac & Cheese | Basics with Babish",
//     "url": "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     "rating": 2111
//   },
//   {
//     "id": 858566,
//     "title": "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     "url": "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     "rating": 11
//   },
//   {
//     "id": 453538,
//     "title": "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     "url": "https://www.youtube.com/watch?v=4As0e4de-rI",
//     "rating": 3211
//   },
//   {
//     "id": 283634,
//     "title": "Learn Unity - Beginner's Game Development Course",
//     "url": "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     "rating": 211
//   },
//   {
//     "id": 562824,
//     "title": "Cracking Enigma in 2021 - Computerphile",
//     "url": "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     "rating": 111
//   },
//   {
//     "id": 442452,
//     "title": "Coding Adventure: Chess AI",
//     "url": "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     "rating": 671
//   },
//   {
//     "id": 536363,
//     "title": "Coding Adventure: Ant and Slime Simulations",
//     "url": "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     "rating": 76
//   },
//   {
//     "id": 323445,
//     "title": "Why the Tour de France is so brutal",
//     "url": "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     "rating": 73
//   }
// ]
// ;

// GET "/"
app.get("/", (req, res) => {
  pool
  .query('select * from videos')
  ,then((result) => res.json(result.rows))
  .catch((e) =>  console.error(e)) 
});

app.post("/", (req, res) => {
  let newVid = {
    id: uuid.v4(),
    title: req.body.title,
    url: req.body.url,
    rating: 0
  }

  const foundVideo = videos.filter(vid => {
    vid.url === newVid.url
  } );


  //last endpoint will work correctly when database added
  if (!newVid.title) {
    return res.status(400).json(`Please enter a title`);
  } else if (!newVid.url) {
    return res.status(400).json(`Please enter a url`);
  } else if (foundVideo.length === 0) {
    videos.push(newVid)
    return res.json(videos);
  }
  res.status(400).json(`Video already added`)
});

app.get("/:videoId", (req, res) => {

  const requestedVid = videos.filter(vid => {
  vid.id = vid.id.toString();
  return vid.id === req.params.videoId}); 
  res.json(requestedVid);
})

app.delete("/:videoId", (req, res) => {
  const found = videos.some(
    vid => vid.id.toString() === req.params.videoId
  );;

  if (found) {
   res.json(videos.filter(vid => vid.id.toString() !== req.params.videoId)); 
  } else {
    res.status(400).send(`There's no video with the id ${req.params.messageId}`);
  }
})
