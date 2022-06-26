const express = require("express");
const app = express();
const uuid = require('uuid');
const cors = require('cors');
const {Pool} = require('pg')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Listening on port ${port}`));



const pool = new Pool(
 { 

   user: 'postgres',
   host: 'localhost', 
   database: 'youtube_videos',
   password: 'Anvita2018',
   port: 5432
 }
);
app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
// app.post("/", (req, res) => {
//   const id = uuid.v4()
//   const title = req.body.title;
//   const url = req.body.url;
  
//   pool.query("INSERT INTO videos(video_id, video_title, video_url) VALUES($1, $2, $3)", [id, title, url])
//   .then(result => res.send(result))
// });


// add videos 
// app.post("/", (req, res) => {
//   const title = req.body.title;
//   const url = req.body.url;
//   const id = uuid.v4()
//   if(!req.body.title === undefined || req.body.url === undefined || req.body.title === "" || req.body.url === "") {
//     res.status(400)
//     return res.json({"result": "failure", "message": "Video could not be saved"});
//   }
//   console.log(req.body.title)
//   videos.push({
//     id:id,
//     title:title,
//     url:url
//   })
//   res.send(id);
// });

// //filter video by id
// app.get('/:id', (req, res) => {
//   const filteredData = videos.filter(vid => vid.id == req.params.id)
//   res.send(filteredData)
// });

//delete a video by id
// app.delete('/:id', (req, res) => {
//   if (!req.params.id) {
//     res.json({
//   "result": "failure",
//   "message": "Video could not be deleted"
// })
//   }
//   const filteredData = videos.filter(vid => vid.id != req.params.id)
//   res.send(filteredData)
// });

