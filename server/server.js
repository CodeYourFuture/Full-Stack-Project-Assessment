const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const db = require("./db")
const app = express();
const bodyParser = require("body-parser"); 


const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


// app.get("/", (req, res) => {
//   res.send(videos); 
// });

app.get("/videos", async (req, res) => {
  try {
    const query = "SELECT * FROM videos";
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:id", (req, res) => {
  const videoID = Number(req.params.id);

  const foundVideo = videos.find((booking) => {
    return booking.id === videoID;
    // returns element || undefined
  });

  foundVideo !== undefined
    ? res.status(200).send(foundVideo)
    : res.status(404).send(`There is no video with id ${videoID}`);
});

app.post("/addVideos", async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      result: "failure",
      message: "Both title and url must be provided",
    });
  }
  console.log(title + url)
  try {
    const queryText = 'INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING *';
    const values = [title, url];

    const result = await db.query(queryText, values);

    res.status(201).json(result.rows[0]); 
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete("/:id", (req, res) => {
  const videoID = Number(req.params.id);

  const videoToDelete = videos.findIndex((video) => {
    return video.id === videoID;
    // returns index of the video || -1
  });

  if (videoToDelete !== -1) {
    videos.splice(videoToDelete, 1);
    res.status(200).send(`Deleted video with id: ${videoID}`);
  } else {
    res.status(404).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.put("/:id", (req, res) => {

  const videoID = Number(req.params.id);

  console.log("req.body")

  console.log(req.body)
  // validate the req
  const schema = Joi.object({
    rating: Joi.number().required()
  });

  const result = schema.validate(req.body);
  console.log(result)
  const foundVideo = videos.find((booking) => {
    return booking.id === videoID;
    // returns element || undefined
  });


  // update the vote count of this object
  foundVideo.rating = result.value.rating

  foundVideo !== undefined
    ? res.status(200).send(foundVideo)
    : res.status(404).send(`There is no video with id ${videoID}`);
})

app.listen(port, () => console.log(`Listening on port ${port}`));