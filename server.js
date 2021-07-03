const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_fullStackProject");
const uuid = require("uuid");
// const videos = require("./exampleresponse.json");

console.log(pool)

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];


// GET data from database - Level - 300
app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos", (db_err, db_res) => {
      if (db_err) {
          res.send(JSON.stringify(db_err));
      } else {
          res.json(db_res.rows);
      }
  })
})


// Delete a video from database Level -300
app.delete("/:id", (req, res) => {
  const {id} = req.params;

  pool.query('SELECT * FROM videos WHERE id=$1', [id], (db_err, db_res) => {
    if(db_res.rows.length > 0) {
      pool.query('DELETE FROM videos WHERE id=$1', [id], (db_err, db_res) => {
        if(db_err) {
          res.status(500).send(JSON.stringify(db_err.message));
        } else {
          res.json(db_res.rows);
        }
      })
    } else {
      res.status(400).send("The id you want to delete is not present")
    }
  })
});


// Create a post in the database - Level - 300
app.post("/", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = req.body.rating

  pool
  .query('SELECT * FROM videos WHERE url=$1', [newUrl])
  .then((result => {
    if (result.rows.length > 0) {
      return res.status(400).send("This url already exists!")
    } else {
      const query = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
      pool
      .query(query, [newTitle, newUrl, newRating])
      .then(() => res.send("New video created!"))
      .catch((e) => console.log(e))
    }
  }));
});


// GET data from server - Level - 250
// app.get("/", (req, res) => {
//   pool.query("SELECT * FROM videos", (error, result) => {
//     res.json(result.rows)
//   })
// })

// Search functionality
// app.get("/search", (req, res) => {
//   const { name } = req.query;

//   if (name) {
//     const filteredVideo = videos.filter((video) => video.title.toUpperCase().includes(name.toUpperCase()));

//     if (filteredVideo.length > 0) {
//       return res.json(filteredVideo)
//     } else {
//       return res.status(404).json({ message: `No video found` })
//     }
//   }
// });


// Create a new booking in the server  - Level - 250
// app.post("/", (req, res) => {
//   const newVideo = {
//     id: uuid.v4(),
//     title: req.body.title,
//     url: req.body.url,
//     rating: 0,
//     timeSent: new Date().toLocaleString() // store a timestamp in each video object.
//   };

//   const uniqueVideoIdCheck = videos.some((video) => String(video.id) === req.body.id);

//   if (uniqueVideoIdCheck) {
//     return res.status(400).json({ message: "Video Id is already created, please select another video id" })
//   }

//   if (!newVideo.title || !newVideo.url) {
//     return res.status(400).json({ message: "Please fill in all fields", result: "Video could not be saved" });
//   }

//   videos.push(newVideo);
//   res.json(videos);
// });


// Read one video specified by an ID - Level - 250
// app.get("/:id", (req, res) => {
//   const selectedId = req.params.id;
//   const isVideoIdFound = videos.some((video) => String(video.id) === selectedId);

//   if (isVideoIdFound) {
//     return res.json(videos.filter((video) => String(video.id) === selectedId));
//   } else {
//     return res.status(404).json({ message: `No video with the id of ${selectedId}` });
//   }
// });



// Delete a video from server Level -250
// app.delete("/:id", (req, res) => {
//   const isVideoIdFound = videos.some((video) => String(video.id) === req.params.id);
//   let deletedVideo;

//   if (isVideoIdFound) {
//     videos.forEach((video, index) => {
//       if (String(video.id) === req.params.id) {
//         deletedVideo = video;
//         videos.splice(index, 1);
//       }
//     })
//     return res.json({ msg: `Video id ${req.params.id} deleted on ${new Date().toLocaleString()}`, deletedVideo });
//   } else {
//     return res.status(404).json({ message: `No video with the id of ${req.params.id}`, result: "Video could not be deleted" });
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));