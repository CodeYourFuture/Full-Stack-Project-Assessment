const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const port = process.env.PORT || 5070;
const app = express();
const videosPool = require('./dbConfig')
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const videoItems = await videosPool.query(
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
        const newItem = await videosPool.query(
            'INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0) RETURNING *',
            [title, url]
        );
        res.status(201).json({
            message: "New item added!",
            item: newItem.rows
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
        const result = await videosPool.query(query, [id]);

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


app.listen(port, () => console.log(`Listening on port ${port}`));