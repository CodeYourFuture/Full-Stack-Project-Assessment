const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const videos = require("./exampleresponse.json");
const cors = require("cors");

app.use(cors());

app.use(express.json());
let id = 1;

const validVideo =(url)=> {
  const regex =  /^[a-zA-Z0-9 -]{1,60}$/;
  if (url.match(regex)) {
    return true;
  }
  return false;
}

app.get("/", (req, res) => {
  res.send(videos);
});

app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (title && validVideo(url)) {
    videos.push({ title, url, id: id++ });
    return res.sendStatus(200);
  }else{
  return res.sendStatus(400);
}
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const vid = videos.find((v) => v.id === Number(id));
  if (vid) return res.send(vid);
  return res.status(404).send("The typed Id is not found, TRY another");
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indexVid = videos.findIndex((v) => v.id === Number(id));

  if (indexVid !== -1) {
    videos.splice(indexVid, 1);
    return res.send({});
  }
else{
  res.send({
    result: "failure",
    message: "Video could not be deleted",
  });
}
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/*

const { Pool } = require("pg");


const databaseConfig = {
  host: "localhost",
  port: 000,
  user: "postgres",
  password: "",
  database: "Full-Stack-Project-Assessment-4/Backend - Database/myTube.sql",
};

const pool = new Pool(databaseConfig);


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

//Add video in Database
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

*/