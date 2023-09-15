// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;
// const videos = require("../client/src/Data/exampleresponse.json");
// const cors = require("cors");
// const itemsPool = require('./dbConfig');

// app.use(express.json());
// app.use(cors());

// // <-------------------get------------------->
// app.get("/", (req, res) => {
//   let orderedVideos = [...videos];
//   const order = req.query.order;

//   if (order === "asc") {
//     orderedVideos.sort((a, b) => a.rating - b.rating);
//   } else {
//     orderedVideos.sort((a, b) => b.rating - a.rating);
//   }

//   res.json(orderedVideos);
// });
// // <----------------------------------------->
// // <---------------get By ID----------------->

// app.get("/:id", (req, res) => {
//   const id = req.params.id * 1;
//   const video = videos.find((ele) => ele.id === id);

//   if (!video) {
//     return res
//       .status(404)
//       .json({ result: "failure", message: "Video not found" });
//   }

//   res.json(video);
// });
// // <----------------------------------------->

// // <---------------------Edit---------------->
// app.post("/", (req, res) => {
//   const { title, url } = req.body;

//   if (!title || !url) {
//     return res
//       .status(400)
//       .json({ result: "failure", message: "Video could not be saved" });
//   }
//   const id = Math.max(...videos.map((video) => video.id), 0) + 1;
//   const newVideo = { id, title, url, rating: 0 };
//   videos.push(newVideo);

//   res.status(201).json({ id });
// });
// // <----------------------------------------->

// // <-------------------Delete---------------->
// app.delete("/:id", (req, res) => {
//   const id = req.params.id * 1;

//   const index = videos.findIndex((ele) => ele.id === id);

//   if (index === -1) {
//     return res
//       .status(404)
//       .json({ result: "failure", message: "Video not found" });
//   }

//   videos.splice(index, 1);

//   res.json({ message: "The item has been deleted" });
// });
// // <------------------ app starting ----------->

// app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const videosPool = require("./DBConfig");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

// <-------------------GET all items------------------->
app.get("/videos", async (req, res) => {
  try {
    const allVideos = await videosPool.query("SELECT * FROM videos");
    res.json({ allVideos: allVideos.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// <---------------------------------------------------->

// <---------------GET item By ID----------------->
app.get("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const item = await videosPool.query("SELECT * FROM videos WHERE id = $1", [
      videoId,
    ]);

    if (item.rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      res.json(item.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// <---------------------------------------------------->

// <-------------------POST new item------------------->
app.post("/videos", async (req, res) => {
  const { description } = req.body;
  try {
    const newVideos = await videosPool.query(
      "INSERT INTO videos (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json({
      message: "New video added!",
      video: newVideos.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// <---------------------------------------------------->

// <-------------------DELETE item------------------->
app.delete("/videos/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const deletedVideo = await videosPool.query(
      "DELETE FROM videos WHERE id = $1 RETURNING *",
      [videoId]
    );

    if (deletedVideo.rows.length === 0) {
      res.status(404).json({ message: "Video not found" });
    } else {
      res.json({
        message: "Video deleted",
        deletedVideo: deletedVideo.rows[0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// <---------------------------------------------------->

// <------------------ Start the app -------------->
app.listen(port, () => console.log(`Listening on port ${port}`));
