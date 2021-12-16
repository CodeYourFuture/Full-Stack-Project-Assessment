import express, { json, query } from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(cors());

//get all videos 
app.get("/", async (req, res) => {
  try {
    const allVideos = await pool.query('SELECT * FROM videos;');
    res.status(201).send(allVideos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//post new video
app.post("/", async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      res.status(404).send({
        result: "failure",
        message: "Video could not be saved",
      });
      return;
    }

    const newVideo = await pool.query(
      'INSERT INTO videos (title, url) VALUES ($1, $2);',
      [title, url]
    );
    return res.json(newVideo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//delete video
app.delete("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const DelVc = await pool.query('DELETE FROM videos WHERE id=$1;', [videoId]);
    return res.send(DelVc.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//--------------------------------------------------------------------------------------------------//
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = videoData;

// GET "/"
// app.get("/", (req, res) => {
//   if (videos) {
//     res.status(201).send(videos);
//   } else {
//     res.status(404).send("Page not found");
//   }
// });

// app.post("/", (req, res) => {
//   const newVideo = req.body;

//   if (!newVideo.title || !newVideo.url) {
//     res.status(404).send({
//       result: "failure",
//       message: "Video could not be saved",
//     });
//     return;
//   }

//   const newVcData = {
//     id: videos[videos.length - 1].id + 1,
//     title: newVideo.title,
//     url: newVideo.url,
//   };

//   if (newVideo) {
//     videos.push(newVcData);
//     res.status(201).send({ id: newVcData.id });
//   } else {
//     res.status(400).send("error");
//   }
// });

// app.get("/:videoId", (req, res) => {
//   const filteredVideo = videos.filter(
//     (video) => video.id === +req.params.videoId
//   );

//   if (filteredVideo.length === 0) {
//     res.status(404).send("video file not exist");
//     return;
//   }
//   res.send(filteredVideo);
// });

// app.delete("/:videoId", (req, res) => {
//   const index = videos.findIndex((video) => video.id === +req.params.videoId);

//   if (index === -1) {
//     res.status(404).send({
//       result: "failure",
//       message: "Video could not be deleted",
//     });
//     return;
//   }

//   videos.splice(index, 1);

//   res.send({});
// });

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
