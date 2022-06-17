const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// const jsonData = require("../exampleresponse.json");

// // Store and retrieve your videos from here
// // If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = jsonData;

// // GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send(videos);
// });


// GET "/post"
// app.post("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   const newVideo = req.body 
//   if(!newVideo.title || !newVideo.url){
//     res.send({"result": "failure",
//   "message": "Video could not be saved"})
//   } else {
//     newVideo.id = 0;
//     videos.push(newVideo);
//   }

//   // 
//   res.send(newVideo)
// });