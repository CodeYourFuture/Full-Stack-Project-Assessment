
const express = require("express");
let videos = require("./videos.json");
const { Pool } = require("pg");


const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  next();
});


const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Cali2011",
  database: "cyf-myTube",
};

const pool = new Pool(dbConfig);


const invalidVideoMessage = { message: "Invalid video name" };

function isValidVideo(video) {
  // Only accept letters, numbers, white space and dash characters
  const regexp = /^[a-zA-Z0-9 -]{1,60}$/;
  return video.match &&  // Make sure the match method exists
    video.match(regexp);  // Execute regular expression matching
}

// SQL Queries
const allVidQuery = `SELECT * FROM videos`;

// const deleteVid = `DELETE FROM videos WHERE id = $1`;


// // GET from server json data"/"
// app.get("/videos", (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: videos.length,
//     data: {
//       videos
//     }
//   });
// });

// Get from database
app.get("/videos", async (req, res) => {
  try {
    const vid = await pool.query(allVidQuery);
    res.status(200).json({
      status: "success",
      data: vid.rows,
    })

  } catch (err) {
    console.error(err.message)
  }
})

// ADDING VIDEOS 
// app.post("/videos", (req, res) => {
//   let newVideo = req.body;

//   if (
//     // !newVideo.id ||
//     !newVideo.title ||
//     !newVideo.url

//   ) {
//     res.status(400);
//     res.send("Please fill in all fields");
//   } else if (videos.find((video) => video.id === newVideo.id)) {
//     res.status(400);
//     res.send("Video already exists");
//   } else {
//     newVideo.id = Math.floor(Math.random() * 100);
//     newVideo.rating = 0;
//     videos.push(newVideo);
//     res.status(201);
//     console.log(newVideo);
//     res.send(newVideo);
//   }

// });

//Add 
app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body;
    const newVideo = await pool.query
      ("INSERT INTO videos (title, url) VALUES ($1, $2))", [title, url]);


    res.json(newVideo.rows);
  } catch (err) {
    console.error(err.message)
  }
})





// //Delete a video by an id
// app.delete("/videos/:id", (req, res) => {
//   const index = videos.findIndex((video) => video.id === parseInt(req.params.id)
//   );
//   console.log(req.params.id)
//   if (index >= 0) {
//     videos.splice(index, 1);
//     return res.json(videos)
//   } else {
//     res.status(404).send('The video requested to be deleted does not exist');
//   }
// });

//Delete from the database
app.delete("/videos:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVid = await pool.query("DELETE FROM videos WHERE videos id = $1", [id])

    res.json(deleteVid);

  } catch (err) {
    console.error(err.message);
  }
})



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
