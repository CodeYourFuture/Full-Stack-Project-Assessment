const { request } = require("express");
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

let videos = require("./exampleresponse.json");

//GET "/?order=asc OR desc"
app.get("/", (req, res) => {
    if (req.query.order) {
        let order = req.query.order.toLowerCase()
        let asc = videos.sort((videoA, videoB) => videoA.rating - videoB.rating);
        let desc = videos.sort((videoA, videoB) => videoB.rating - videoA.rating);

        const orders = { asc, desc };

        res.json(orders[order]);
    } else {
        let defaultOrder = videos.sort((videoA, videoB) => videoB.rating - videoA.rating);
        res.json(defaultOrder);
    }
});

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
