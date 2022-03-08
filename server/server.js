const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const postgres = require("pg");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const pool = new postgres.Pool({
  user: process.env.PG_User,
  host: process.env.PG_Host,
  database: process.env.PG_Database,
  password: process.env.PG_Password,
  port: process.env.PG_Port,
  ssl: {
    rejectUnauthorized: false,
  },
});

// retrieve a video matching the provided ID
app.get("/:videoId", (req, res) => {
  pool.connect().then((client) => {
    const id = parseInt(req.params.videoId);
    return client
      .query(
        `SELECT * FROM videos WHERE id=$1`,
        [id]
      )
      .then((result) => {
        if(result.rowCount === 0){
          client.release();
          res.status(400).send(`Video with ID: ${id} does not exist.`)
        }else{
          client.query(
              `SELECT * FROM videos WHERE ID=$1;`,
              [id]
            )
            .then((result) => {
              client.release();
              res.send(result.rows);
            })
            .catch((error) => {
              client.release();
              console.error(error);
              // res.status(error.status).send(error)
            })
        }
      })
      
  })
  
})

// retrieve all videos
app.get("/", (req, res) => {
  pool.connect().then((client) => {
    return client
      .query(
        `SELECT * FROM videos;`
      )
      .then((result) => {
        client.release();
        res.send(result.rows);
      })
      .catch((error) => {
        client.release();
        console.error(error);
        // res.status(error.status).send(error);
      })
  })
});

// add a video providing a title and URL
app.post("/", (req, res) => {
  const body = req.body;
  pool.connect().then((client) => {
    return client
      .query(
        `
        INSERT INTO videos (title, url)
        VALUES ($1, $2);
        `,
        [body.title, body.url]
      )
      .then(() => {
        client.release();
        res.send(`Successfully added your video.`);
      })
      .catch((error) => {
        client.release();
        console.error(error);
        // res.status(error.status).send(error);
      })
  })
})

//delete a video with the provided ID
app.delete("/:videoId", (req, res) => {
  const id = req.params.videoId;
  pool.connect().then((client) => {
    return client
      .query(
        `SELECT * FROM videos WHERE id = $1`,
        [id]
      )
      .then((result) => {
        if(result.rowCount === 0){
          client.release();
          res.status(400).send(`Video with ID: ${id} does not exist.`)
        }else{
          client
            .query(
              `
                DELETE FROM videos WHERE id=$1
              `,
              [id]
            )
            .then(() => {
              client.release();
              res.send(`Successfully deleted video with ID: ${id}`);
            })
            .catch((error) => {
              client.release();
              console.error(error);
              // res.status(error.status).send(error);
            });
        }
      })
      
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
