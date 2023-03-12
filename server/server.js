const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const { Pool } = require("pg");
const pool = new Pool({
  user: "shafiekd",
  host: "dpg-cg3jpapmbg5fch553i8g-a.oregon-postgres.render.com",
  database: "full_stack_oc5w",
  password: "O7xPhEwn3GRBiQssltrzKwfDLI3aNdXg",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (req, res) => {
  // res.json(video);
  pool
    .query("SELECT * FROM video")
    .then((result) => res.send(result.rows).json)
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// `GET` "/{id}"

app.get("/:id", (req, res) => {
  console.log(req.params.id);

  let vidId = parseInt(req.params.id);
  pool
    .query("SELECT * FROM video WHERE video.id=$1", [vidId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// `DELETE` "/{id}"

app.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const vidId = parseInt(req.params.id);

  pool
    .query("DELETE from video where id = $1", [vidId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// `POST` "/"

app.post("/", function (req, res) {
  let newTitle = req.body.title;
  let newUrl = req.body.url;
  let newRating = req.body.rating;
  pool
    .query("SELECT * FROM  video where title=$1", [newTitle])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400).send("Video exists!");
      } else {
        const query =
          "INSERT INTO video (title, url, rating) VALUES ($1, $2, $3)";
        pool
          .query(query, [newTitle, newUrl, newRating])
          .then(() => res.send("New Video sucessfully added!"))
          .catch((error) => {
            console.error(error);
            res.status(500).json(error);
          });
      }
    });
});
