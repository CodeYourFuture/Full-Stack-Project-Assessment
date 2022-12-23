const data = require("../client/src/exampleresponse.json");
const pool = require("./connection");
const express = require("express");
const cors = require("cors");
const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors())

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  pool.query("SELECT * FROM videos")
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err)
      res.status(500).json(err);
    });
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM videos WHERE id = $1", [id])
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        result: "failure",
        message: "Video could not be found",
      });
    })
});

app.post("/", (req, res) => {

  const { title, url } = req.body;
  const video = { title, url };

  if (!Object.values(video).every((v) => v)) {
    return res.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }

  pool.query("INSERT INTO videos (title, link) VALUES ($1, $2)", [title, url])
    .then(() => res.json(video))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
    
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM videos WHERE id = $1", [id])
    .then(() => res.json({}))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
})
