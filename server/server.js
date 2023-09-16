import cors from "cors";
import express from "express";
import {videos} from './data.js';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

app.get("/", function (req, res) {
    res.status(200).json({videos});
});

app.get('/:id', function (req, res) {
    const id = req.params.id;
    res.status(200).json({videos: videos.filter(video => String(video.id) === id)});
});

app.post('/', function (req, res) {
    if (req.body.title && req.body.url) {
        const newVideo = {
            id: Date.now(),
            title: req.body.title,
            url: req.body.url,
            rating: 0,
            timestamp: new Date(),
        }
        videos.push(newVideo);
        res.status(201).json({newVideo})
    } else {
        res.status(400).json({
            error: {
                "result": "failure",
                "message": "Video could not be saved"
            }
        });
    }
});

app.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    // Find the item index in the array
    const videoIndex = videos.findIndex((video) => video.id === id);

    if (videoIndex === -1) {
        // Item not found
        res.status(404).json({
            error: {
                "result": "failure",
                "message": "Video could not be deleted"
            }
        });
    } else {
        // Remove the item from the array
        videos.splice(videoIndex, 1);
        res.status(200).json({success: true});
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));