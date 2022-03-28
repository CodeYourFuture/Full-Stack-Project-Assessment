const express = require("express");
const app = express();
const cors = require("cors");
// const data = require("./exampleresponse.json");
const validUrl = require("valid-url");
const { Pool } = require("pg");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.CONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false,
  },
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

// GET "/"
app.get("/", (req, res) => {
	const query =
		"SELECT * FROM videos ORDER BY rating";
	pool.query(query)
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// POST "/"
app.post("/",  (req, res) => {
  const title = req.body.title;
  const url = req.body.url;
	// input check!
	if (!title || !url) {
		return res.status(400).send("Please complete all fields!");
	}
  const query =
 ` INSERT INTO videos ( title, url, rating ) VALUES ($1, $2 ,${0} ) RETURNING *`;
pool.query(query, [title, url])
  .then((result) => {
    res.send(result.rows[0]);
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send(err.message);
  });
});

// GET "/{id}"
app.get("/:id", (req, res) => {
  const videoId = +req.params.id;
	const query =
		"SELECT * FROM videos WHERE id =$1 ";
	pool.query(query,[videoId])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// DELETE "/{id}"
app.delete("/:id", (req, res) => {
	const  videoId  = req.params.id;
	pool.query("DELETE FROM videos WHERE id=$1 RETURNING *", [
		videoId,
	])
		.then((result) => {
			if (result.rowCount) {
				res.send(result.rows[0]);
			} else {
				res
					.status(404)
					.send(`couldn't find this ID: ${videoId}`);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});



app.listen(port, () => console.log(`Listening on port ${port}`));
