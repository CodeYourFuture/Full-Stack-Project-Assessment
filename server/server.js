const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path')
const getPostgresClient = require("./postgresClient");
const paths = path.join(__dirname, '../client/build')
const port = process.env.PORT || 5000;

const app = express();


// Middle-wares
app.use(cors());
app.use(express.json());
app.use(express.static(paths))
app.use(express.urlencoded({ extended: true }));


// Connecting to postgres
let client
getPostgresClient().then(result => client = result);


// Routes
// app.get("/", (req, res) => {
//   res.sendFile("index.html")
// })

app.get("/videos", (req, res) => {
  client.query("SELECT * FROM video", (err, result) => {
    res.json(result.rows);
  });
});

app.get("/videos/:id", (req, res) => {
  const result = videos.find((el) => el.id === +req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.send("Video not found");
  }
});

app.post("/videos", (req, res) => {
  let { title, url } = req.body;
  if (title && url) {
    client.query(
      `INSERT INTO video(title, url) values ($1, $2)`,
      [title, url],
      (err, result) => {
        res.status(203).json({ ...req.body });
      }
    );
  } else {
    res.status(400).json({
      status: "failed",
      message: "Please provide a valid title or url"
    })
  }
});

app.delete("/videos/:id", (req, res) => {
  client.connect()
  const id = req.params.id;
  client.query(`DELETE FROM video WHERE id = $1`, [id], (err, result) => {
    res.status(204).send(result.rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}, ${paths}`));
