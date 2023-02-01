const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { Pool } = require("pg");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Add validators for same url and also for the delete button if id doesn't exist

// connection string for production use tenary operator for either prod or dev

//DATABASE CONNECTION
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  connectionTimeoutMillis: 6000,
  ssl: { rejectUnauthorized: false },
});

const isValidYouTubeUrl = (url) => {
  const regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return regExp.test(url);
};

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = [];
app.get("/", (res, req) => {
  //res.json({ message: "Welcome to my Videos API!" });
  console.log(__dirname + "/index.html");
});

app.get("/videos", async (req, res) => {
  try {
    let data = await pool.query("SELECT * FROM videos ORDER BY rating DESC");
    const order = req.query.order;

    if (order === "asc") {
      let data = await pool
        .query("SELECT * FROM videos ORDER BY rating ASC")
        .then((result) => res.json(result.rows));
      return;
    }
    if (order === "desc") {
      let data = await pool
        .query("SELECT * FROM videos ORDER BY rating DESC")
        .then((result) => res.json(result.rows));
      return;
    }
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/videos/:id", async (req, res) => {
  try {
    const vidId = parseInt(req.params.id);
    if (vidId) {
      const video = await pool
        .query("SELECT * FROM videos WHERE id = $1", [vidId])
        .then((result) => {
          //checks if given video ID exists
          if (result.rows.length === 0) {
            res.json({ result: "error", message: "Video not found" });
            return;
          }
          res.json(result.rows);
        });
    }
  } catch (error) {
    console.error(error.message);
    return;
  }
});

//POST "/videos"

app.post("/videos", (req, res) => {
  //let maxID = Math.max(...videos.map((video) => video.id));
  if (!req.body.title) {
    res.status(400).send({ result: "error", message: "Enter a valid title" });
  } else if (!req.body.url) {
    res.status(400).send({ result: "error", message: "Enter a valid URL" });
    return;
  } else if (!isValidYouTubeUrl(req.body.url)) {
    res.sendStatus(403);
  }
  if (isNaN(req.body.rating)) {
    res.status(400).send({ result: "error", message: "Bad Request" });
    return;
  }
  if (!Number.isInteger(req.body.rating)) {
    res.status(400).send({ result: "error", message: "Bad Request" });
    return;
  }
  if (req.body.rating < 0) {
    res.status(400).send({ result: "error", message: "Bad Request" });
    return;
  }

  //creating a new video
  //let maxID = Math.max(...videos.map((video) => video.id));
  const { id, title, url, rating } = {
    //id: ++maxID,
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
  };
  const addNewVideo = pool
    .query(
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3) RETURNING * ",
      [title, url, rating]
    )
    .then(() => res.json({ id: id, message: "Video successfully uploaded" }))
    .catch((err) => {
      console.error(err);
      res.send({ result: "error", message: "Internal Server Error" });
    });
});

app.delete("/videos/:id", async (req, res) => {
  try {
    const vidId = parseInt(req.params.id);

    const sqlQuery = pool
      .query("SELECT * FROM videos WHERE id = $1", [vidId])
      .then((result) => {
        if (result.rows.length === 0) {
          res.json({ result: "error", message: "Video not found" });
        } else {
          const video = pool
            .query(`DELETE FROM videos WHERE id = ${vidId}`)
            .then(() => res.json("successfully deleted"));
        }
      });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
