const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5001;

//This will read the data from videos.json file
let videos = JSON.parse(fs.readFileSync("/Users/admin/Desktop/Newsletter-Signup/Full-Stack-Project-Assessment/server/data/videos.json"));

app.use(express.json());


// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      videos: videos
    }
  })
  // Delete this line after you've confirmed your server is running
  
});


app.post("/", (req, res) => {
  const newId = videos[videos.length -1].id +1;
const newVideo = Object.assign({id: newId}, req.body)

videos.push(newVideo);

fs.writeFile("/Users/admin/Desktop/Newsletter-Signup/Full-Stack-Project-Assessment/server/data/videos.json", JSON.stringify(videos), (err) => {
  res.status(201).json({
    status: "Success",
    data: {
      video: newVideo
    }
  })
})
  })


//DELETE
app.delete("/:id", (req, res) => {
const id = req.params.id +1;
const videoToDelete = videos.find(el => el.id === id);

// if(!videoToDelete){
//   return res.status(404).json({
//     status: "fail",
//     message: "Video with ID: " + id + " is not found"
//   })
// }

const index = videos.indexOf(videoToDelete);

videos.splice(index, 1);

fs.writeFile("/Users/admin/Desktop/Newsletter-Signup/Full-Stack-Project-Assessment/server/data/videos.json", JSON.stringify(videos), (err) => {
  res.status(204).json({
    status: "Success",
    data: {
      video: null
    }
  })
})
})


app.listen(port, () => console.log(`Listening on port ${port}`));