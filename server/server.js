const express = require("express");
const cors = require('cors');
const { validate, ValidationError, Joi } = require('express-validation');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const videos = require('./exampleresponse.json');

const videoSchema = {
  body: Joi.object({
    id: Joi.required(),
    title: Joi.string().min(2).max(100).required(),
    url: Joi.string().min(2).max(100).required(),
    rating: Joi.number().integer().required()
  })
};



// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => res.send(videos));

app.get('/')

app.post('/', validate(videoSchema, {}, {}), (req, res) => {
  const { id, title, url, rating, uploadDate } = req.body;

  if (!url.includes('https://www.youtube.com/watch?v=')) {
    res.status(404).send('Not a valid YouTube URL');
  };

  const newVideoData = {
    id,
    title,
    url,
    rating,
    uploadDate
  }

  videos.push(newVideoData);
  res.json(200);

})

app.delete('/:id', (req, res) => {
  const videoFound = videos.indexOf(videos.find(video => video.id === Number(req.params.id)));
  if (videoFound > -1) {
    videos.splice(videoFound, 1);
    res.status(200).send({});
  } else {
    res.status(404).send({
      "result": "failure",
      "message": "Video could not be deleted"
    });
  }
})

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  return res.status(500).json(err)
})


app.listen(port, () => console.log(`Listening on port ${port}`));