require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const db = require("./db");

app.use(cors());
app.use(bodyParser.json());
db.connect;

app.get("/videos", async (req, res) => {
  try {
    const query = "select * from videos";
    const videos = await db.query(query);
    res.status(200).json(videos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// // GET "/" ....confirms server is running
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

// // This endpoint is used to return all of the videos
// app.get("/videos", (req, res) => {
//   res.status(200).json({ videos });
// });

// This endpoint is used to add a video to the API.
app.post("/videos", (req, res) => {
  
  try {
    let newVideo = {
      title: req.body.title,
      url: req.body.url,
    };

    if (
      !newVideo.title ||
      !newVideo.url ||
      !newVideo.url.startsWith("https://www.youtube.com")
    ) {
      res.status(404).send({
        result: "failure",
        message: "Video could not be saved",
      });
    } else {
      console.log(req.body);
      const result = db.one(
        "INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING *",
        [title, url]
      );
console.log(result);
      res.status(201).send({

        message: "Video saved successfully",
        result,
      });
    }
  } catch (error) {}
});

// Returns the video with the ID contained within the {id} parameter.

app.get("/videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });
  if (!matchingVideo) {
    res.status(400).send("No matching video with this ID exists.");
  } else {
    res.status(200).json({ matchingVideo });
  }
});

//Deletes the video with the ID container within the {id} parameter

app.delete("/videos/:id", (req, res) => {
  let id = Number(req.params.id);
  const matchingVideo = videos.find((video) => {
    return video.id === id;
  });

  if (!matchingVideo) {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
      id: id,
    });
  } else {
    const videoIndexToBeDeleted = videos.indexOf(matchingVideo);
    videos.splice(videoIndexToBeDeleted, 1);
    res.status(200).json({
      title: matchingVideo.title,
      message: "Video deleted successfully!",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
