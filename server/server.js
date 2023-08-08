const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
const itemsPool = require('./dbConfig');
const port = process.env.PORT || 5000;


app.get('/videos', async(req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM videos'
        );
        res.json({ videos: allItems.rows });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});


app.get('/videos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const video = await itemsPool.query(
      'SELECT * FROM videos WHERE id = $1',
      [id]
    );

    if (video.rows.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ video: video.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post('/', async (req, res) => {
    const { video } = req.body;
    try {
        const newItem = await itemsPool.query(
            'INSERT INTO videos (title,url,rating) VALUES ($1,$2,$3) RETURNING *',
            [video.title, video.url, video.rating]
        );
        res.status(201).json({ 
            message: "New video added!",
            item: newItem.rows
         });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

app.delete('/videos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVideo = await itemsPool.query(
      'DELETE FROM videos WHERE id = $1 RETURNING *',
      [id]
    );

    if (deletedVideo.rows.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ message: 'Video deleted', video: deletedVideo.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));