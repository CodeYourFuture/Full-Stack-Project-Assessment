const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')
const { Pool } = require('pg')
dotenv.config()
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const pool = new Pool({
	connectionString: process.env.DB_URL,
	ssl: { rejectUnauthorized: false },
})

app.listen(port, () => console.log(`Listening on port ${port}`));


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require("../exampleresponse.json");

// GET "/running"
app.get("/running", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get('/', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM videos')
		res.status(200).json(result.rows)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Error Message' })
	}
})

// `POST` This endpoint is used to add a video to the API.
app.post("/", async (req, res) => {
  try {
    const rating = 0
		const query =
			'INSERT INTO videos (title, url, rating) VALUES ($1,$2,$3) RETURNING *'
		const values = [title, url, rating]
		const result = await pool.query(query, values)
		res.status(201).json(result.rows[0])
    }
   catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Error Message' })
	}
});


// `GET` "/{id}"
app.get("/:id", (req, res) => {
  const videoID = Number(req.params.id);

  const idQuery = "SELECT * FROM videos WHERE id = $1";

  videos
    .query(idQuery, [videoID])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(400).json({ message: `Video ${videoID} not found` });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


//`DELETE` "/{id}"

app.delete('/:id', async (req, res) => {
	try {
		const videoID = Number(req.params.id)
		const query = 'DELETE FROM videos WHERE id = $1 RETURNING *'
		const values = [videoID]
		const result = await pool.query(query, values)
		const deleteVideos = result.rows[0]

		if (deleteVideos) {
			res.status(200).json(deleteVideos)
		} else {
			res.status(404).json({ message: 'Video Not Found' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Error Message' })
	}
})