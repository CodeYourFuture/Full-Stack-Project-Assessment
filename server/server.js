const { request } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

let videos = require("./exampleresponse.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET "/"
app.get("/", (req, res) => {
    res.json(videos);
});

// POST "/"
app.post("/", (req, res) => {
    let video = {
        id: 0,
        title: req.body.title,
        url: req.body.url,
        rating: 0
    }

    if (req.body.title && req.body.url) {
        videos.unshift(video);
        res.json(videos)
    } else {
        res.status(400).json({
            "result": "failure",
            "message": "Video could not be saved"
        })
    }
});

//GET "/:id"
app.get("/:id", (req, res) => {
    let videoId = +req.params.id;
    const found = videos.some(video => video.id === videoId);

    if (found) {
        let selectedVideo = videos.filter(video => video.id === videoId);
        res.json(selectedVideo);
    } else {
        res.status(404).json({
            "result": "failure",
            "message": `No Video with ID ${videoId}`
        })
    }
});

//DELETE "/:id"
app.delete("/:id", (req, res) => {
    let videoId = +req.params.id;
    const found = videos.some(video => video.id === videoId);

    if (found) {
        videos = videos.filter(video => video.id !== videoId);
        res.json({});
    } else {
        res.status(404).json({
            "result": "failure",
            "message": "Video could not be deleted"
        })
    }
})


app.listen(port, () => console.log(`Listening on port ${port}`));
