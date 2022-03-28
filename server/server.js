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


// app.get("/:id", (req, res) => {
//   const videoId = +req.params.id;
//   const found = data.find((el) => {
//     return el.id === videoId;
//   });
//   if (found) {
//     res.json(found);
//   } else {
//     res.status(400).send({ msg: `We cuold not find video with id ${videoId}` });
//   }
// });


// // DELETE "/{id}"
// app.delete("/:id", (req, res) => {
//   const videoId = +req.params.id;
//   const found = data.some((video) => video.id === videoId);
//   if (found) {
//     res.json({
//       msg: `Video deleted ${req.params.id}`,
//       message: data.filter((video) => video.id !== videoId),
//     });
//   } else {
//     res
//       .status(400)
//       .send({ result: "failure", message: "Video could not be deleted" });
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
