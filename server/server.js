const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const pool = require("./config/db");

const port = 5000;

// header('Content-Type: application/json')

app.use(express.json());
// parse requests of content-type -application/x-www.form-urlencoded(form data from client side)
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// parse requests of content-type- application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("It works");
});

app.get("/videos", (req, res) => {
  pool.query("SELECT * FROM videos").then(({ rows }) => res.json(rows));
});

app.post("/videos", async (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;
  const newRating = parseInt(req.body.rating);

  try {
    const newVideo = await pool.query(
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING *",
      [newTitle, newUrl, newRating]
    );
    res.json(newVideo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});


app.delete("/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteVideo = await pool.query("DELETE FROM videos WHERE id=$1", [
      id,
    ]);

    res.json(`Video with the id ${id} deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
