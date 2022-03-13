const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'cvzfmgkjyqnhgb',
  host: 'ec2-34-255-21-191.eu-west-1.compute.amazonaws.com',
  database: 'df9q5i3jod9a7a',
  password: 'e948018709006b206c5041198abceb6e6d0887819331ce7b6b31c4c5bf7ebfbd',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }

})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true,
}));


app.listen(port, () => console.log(`Listening on port ${port}`));

// GET "/"
app.get("/", (req, res) => {
  // res.json(videos);
  pool
  .query("SELECT * FROM videos")
  .then((result) => res.json(result.rows))
  .catch((error) => {
    console.error(error);
    res.status(500).json(error);
  })
});

//POST
app.post("/", (req, res) => {
  const newTitle = req.body.title;
  const newUrl = req.body.url;

  pool
  .query("SELECT * FROM videos WHERE url=$1 OR title=$2", [newUrl, newTitle])
  .then((result) => {
    if (result.rows.length > 0) {
      res.status(400).send("Video or title already exist on page!")
    } else {
      const query = "INSERT INTO videos (title, url) VALUES ($1, $2)";
      
     pool
      .query(query, [newTitle, newUrl])
      .then(() => res.send("Video added successfully!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
    }
  });
});

//GET "/{id}" To retrieve a video by its id

app.get("/:id", (req, res) => {
  const videoId = +req.params.id;

  pool
  .query("SELECT id FROM videos WHERE id=$1", [videoId])
  .then((result) => {
    if (result.rows.length > 0) {
      pool
      .query("SELECT * FROM videos WHERE id=$1", [videoId])
      .then((response) => res.json(response.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
    } else {
      res.status(400).send("Video id does not exist!")
    }
  });
})

//DELETE "/{id}"

app.delete("/:id", (req, res) => {
  const videoId = +req.params.id;
  
  pool
  .query("SELECT id FROM videos WHERE id=$1", [videoId])
  .then((result) => {
    if (result.rows.length > 0) {
      pool
      .query("DELETE FROM videos WHERE id=$1", [videoId])
      .then(() => res.status(200).send("Video deleted successfully!"))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      })
    } else {
      res.status(400).send("Video id did not match!")
    }
  });
})