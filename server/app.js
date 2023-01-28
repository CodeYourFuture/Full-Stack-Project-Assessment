const express = require('express');
// mongodb+srv://jadejones:jadejones@cluster0.iwmguqu.mongodb.net/?retryWrites=true&w=majority

const app = express();
const mongoose = require('mongoose')
var dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const fs = require("fs")

let videos = JSON.parse(fs.readFileSync('videos.json', 'utf-8'));

mongoose.connect(`mongodb+srv://jadejones:jadejones@cluster0.iwmguqu.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.post('/api/videos',(req, res, next) => {
    console.log(req.body)
    res.status(201).json({
        message: 'Video created successfully'
    });
});

app.get('/api/videos', (req, res, next) => {
    res.status(200).json(videos)
  });

app.use((req, res, next) => {
  res.json({ message: 'Your request was successful!' });
  next();
});

app.use((req, res, next) => {
  console.log('Response sent successfully!');
});

module.exports = app;







// // GET "/"
// app.get("/", (req, res) => {
//   res.send(videos)

// });

// // post
// app.post('/', (req,res) => {
//   let maxID = Math.max(...videos.map(c => c.id));
//   const newVideo = Object.assign({ id: ++maxID}, req.body);

//   if(!req.body.url || !req.body.title ){
//     res.status(400).send("All fields are required to be entered");
//     return
//   } else{
//     videos.push(newVideo);
//   fs.writeFile(`${__dirname}/server/videos.json`, JSON.stringify(videos), err => {
//     res.status(201).json({
//         status: 'success',
//         data: {
//             video: newVideo
//         }
//     });
// });
//    }

// })

// // find by id

// app.get(`/:id`, (req, res) => {
//   const reqId = parseInt(req.params.id);

//   const filteredVideos = videos.find((video) => video.id === reqId);

//   if (filteredVideos.length === 0) {
//     res.status(400).send({ msg: `Sorry here are no videos with the ID of ${reqId}` });
//   } else {
//     res.status(200).send(filteredVideos);
//   }
// })

// app.delete('/:id' , (req, res) => {
//   const delId = parseInt(req.params.id)
  
//   const findIndex = videos.findIndex((video) => video.id === delId);

//   if (findIndex >=0){
//     videos.splice(findIndex, 1);
//     res.status(200).send({msg: 'deleted'})
//   } else{
//     res.status(400).send({ msg: `Sorry here are no videos with the ID of ${delId}` });
//   }
// })
