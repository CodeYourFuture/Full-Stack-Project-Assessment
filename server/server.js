const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./dbConfig.js');
dotenv.config();

const port = process.env.PORT || 5070;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const videoItems = await db.query(
            'SELECT * FROM videos'
        );
        res.status(200).json({videos: videoItems.rows});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});


app.post('/', async (req, res) => {
    try {
        const {title, url} = req.body;
        const newVideo = await db.query(
            'INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0) RETURNING *',
            [title, url]
        );
        res.status(201).json({
            message: "New item added!",
            newVideo: newVideo.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                "result": "failure",
                "message": "Video could not be added"
            }
        });
    }
});

app.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const query = 'DELETE FROM videos WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rowCount === 1) {
            res.status(200).json({success: true});
        } else {
            res.status(404).json({
                error: {
                    "result": "failure",
                    "message": "Video could not be deleted"
                }
            });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({error: 'An error occurred while deleting the record'});
    }
});

app.put("/:id", function (req, res) {
    const id = req.params.id;
    const rating = req.body.rating;

    const query = 'UPDATE videos SET rating = $1 WHERE id = $2';
    db.query(query, [rating, id])
        .then(() => res.send(`Video rating updated!`))
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err});
        });
});


app.listen(port, () => console.log(`Listening on port ${port}`));