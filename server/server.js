const express = require("express");
const app = express();
const videos = require("./exampleresponse.json");
const { Pool } = require("pg");

const port = 5000;
app.use(express.json()); 

const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1",
  database: "videos_list_project",
});

app.listen(port, () =>{
  console.log(`Listening on port ${port}`);

});

//  level200-start
app.get("/videos", (req, res) => { 
  let { order } = req.query; 
  order = order === "asc" ? "ASC" : "DESC";
  //  level299-Ordered Data - Back End/start
  // send url: http://localhost:5000/videos?order=desc or asc for test in postman
 
  db.query("SELECT * FROM youtube_videos ORDER BY rating "+ order )
    .then((result) => res.json(result.rows))
    .catch((error) => res.status(500).json(error));
});

// for convert string to number add + before request
app.get("/videos/:id", (req, res) => {  
  const newId =+ req.params.id; 
  const oneVideo = videos.find((video) => video.id === newId);
  if (oneVideo) { 
    res.json(oneVideo); 
  }   
  res.json({"result": "not Found"});
});

app.post("/videos", (req, res) => {
  // everything from users send in body
  let data = req.body; 

  // new data and get time methods are js inbuild function which are use to create a new id in this project
  data.id = new Date().getTime();
 
  const valid = data.url !== "" && data.title !== "";

  if (valid) {
    videos.push(data);
    res.json({ id: data.id });
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.delete("/videos/:id", (req, res) => {
  const newId =+ req.params.id;
  const index = videos.findIndex((video) => video.id === newId);
  // -1 is not exist result from findindex in array.
  if (index === -1)
    return res.status(404).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  videos.splice(index, 1);
  res.json({});
});
// level 200-end



