const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
// const jsonData = require("../exampleresponse.json");
const app = express();
app.use(cors());
app.use(express.json());

// Get all videos
app.get("/", async (req, res) => {
  const { order, search } = req.query;
  try {
    const allVideos = await pool.query("SELECT * FROM videos");
    console.log(allVideos);
    let filteredVideos = [...allVideos.rows];
    // Apply search filter if search query is provided
    if (search) {
      filteredVideos = filteredVideos.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    //Apply order filter
    if (order === "desc") {
      filteredVideos.sort((a, b) => b.rating - a.rating);
    } else {
      filteredVideos.sort((a, b) => a.rating - b.rating);
    }
    res.status(200).json(filteredVideos);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Get a specific video
// app.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const video = videos.find((video) => video.id == id);
//   if (!video) {
//     res.status(404).json({
//       result: "failure",
//       message: "There is no vide with given data",
//     });
//   } else {
//     res.status(200).json(video);
//   }
// });

// Post a video
app.post("/", async (req, res) => {
  const { title, url, rating, date } = req.body;
  const id = uuidv4();
  try {
    const addVideos = await pool.query(
      "INSERT INTO videos(id, date, title, url, rating) VALUES($1, $2, $3, $4, $5)",
      [id, date, title, url, rating]
    );
    res.status(201).json(addVideos);
  } catch (error) {
    res.status(404).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

//Update video rating
// app.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { rating } = req.body;
//   try {
//     const video = videos.find((video) => video.id == id);
//     if (!video) {
//       res.status(404).json({
//         result: "failure",
//         message: "There is no vide with given data",
//       });
//     } else {
//       videos = videos.map((video) => {
//         if (video.id == id) {
//           return { ...video, rating };
//         }
//         return video;
//       });
//     }
//     res.status(200).json(videos);
//   } catch (error) {
//     console.error(error);
//   }
// });

// //Delete a video
// app.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const video = videos.find((video) => video.id == id);
//   if (!video) {
//     res.status(404).json({
//       result: "failure",
//       message: "There is no vide with given data",
//     });
//   } else {
//     const index = videos.indexOf(video);
//     videos.splice(index, 1);
//     res.status(200).json(videos);
//   }
// });

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
