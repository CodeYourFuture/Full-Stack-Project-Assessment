const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5050;
const videosPool = require("./DBConfig");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", () => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", async  (req, res) =>{
    const allVideos = await videosPool
    .query("SELECT * FROM videos");

    res.json(allVideos.rows);
  });



app.post("/videos", async (req, res) => {
  const { title, url } = req.body;
  let rating = 0;
  try {
    const newVideo = await videosPool.query(
      'INSERT INTO videos ("title","url","rating") VALUES ($1,$2,$3) RETURNING *',
      [title, url, rating]
    );

    res.json({
      message: "Video added successfully",
      newVideo: newVideo.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.put("/videos/:id", async (req, res) => {
  const searchId = req.params.id;
  const newRating = req.body.newRating;
  try {
     videosPool.query("UPDATE videos SET rating = $2 WHERE id = $1", [searchId, newRating]);
    res.json({
      message: "Vote updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});




app.get("/videos/:search", async (req, res) => {
  const searchQuery = req.params.search;
  try {
    const videoData = await videosPool
    .query("SELECT * FROM videos WHERE title LIKE $1",
    [`%${searchQuery}%`]);
    res.json(videoData.rows);

  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete("/videos/:id", async (req, res) => {
  const vidId = req.params.id * 1;
  try {
    const result = await videosPool.query("DELETE FROM videos WHERE id = $1 RETURNING *", [vidId]);

    if (result.rowCount === 1) {
      res.status(200).json("Video deleted");
    } else {
      res.status(404).json("No such Video");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      message: "Video could not be deleted",
    });
  }
});
