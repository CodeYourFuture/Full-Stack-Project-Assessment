const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

const database = require("./dbConfig");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// GET "/"
app.get("/videos", async function (request, response) {
  const sqlQuery = "SELECT * FROM videos;"
  const getAllVideos = await database.query(sqlQuery);
  // console.log(getAllVideos);
  const allVideos = getAllVideos.rows;
  return response.status(200).json(allVideos);
});

app.get("/videos/:id", async function (request, response) {
  
  const videoId = request.params.id;

  // const sqlQuery = "SELECT * FROM videos WHERE id = $1"
  const getVideoById = await database.query(
    "SELECT * FROM videos WHERE id = $1",
    [videoId], 
  );

  if (getVideoById.rows.length === 0) {
   return response.status(400).json({error: `The video with ${videoId} doesnt exist`})
  }

  const videoWithThatId = getVideoById.rows[0]
  return response.status(200).json({ videoWithThatId });

  
  // const eachVideo = videos.find(
  //   (eachVideo) => eachVideo.id === parseInt(videoId)
  // );
  // eachVideo
  //   ? response.json(eachVideo)
  //   : response.json({ message: "There're no videos matching your request" });
});

app.delete("/videos/:id", function (request, response) {
  const videosId = request.params.id;
  const eachVideo = videos.find(
    (eachVideo) => eachVideo.id === parseInt(videosId)
  );

  if (eachVideo) {
    videos = videos.filter((eachVideo) => eachVideo.id !== parseInt(videosId));
    response.json({ message: "Video Succesfully deleted" });
  } else {
    response.json({ message: "Unable to find or delete video" });
  }
});

app.post("/videos/addnew", function (request, response) {
  const addNewVideo = {
    id: videos.length + 1,
    title: request.body.title,
    url: request.body.url,
    rating: 0,
  };

  if (!addNewVideo.title || !addNewVideo.url) {
    return response
      .status(400)
      .json({ message: "Please fill out the required areas" });
  }

  videos.push(addNewVideo);
  response.json(videos);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
