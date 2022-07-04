const express = require("express");
const app = express();
const { Client } = require("pg");
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// const pool = new Pool({
//   Host: "ec2-34-242-84-130.eu-west-1.compute.amazonaws.com",
//   Database: "d3ncm116npf1r2",
//   User: "cgfzxgopwadqxr",
//   Port: 5432,
//   Password: "b0fa2df15237b13455250855053255d49f2a7999fa493fcdfa6250ba2d61fc69",
// });

function matchYoutubeUrl(url) {
  const regex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(regex)) {
    return true;
  }
  return false;
}
// generateRandomId = (arr) => {
//   const randomId = Math.floor(100000 + Math.random() * 900000);
//   const alreadyHasId = arr.some((video) => video.id === randomId);
//   if (alreadyHasId) {
//     generateRandomId(arr);
//   } else {
//     return randomId;
//   }
// };

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some videos to work with

// GET "/"
app.get("/", (req, res) => {
  client
    .query("SELECT * FROM videos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/", (req, res) => {
  const { title, url } = req.body;
  if (title && matchYoutubeUrl(url)) {
    client
      .query("INSERT INTO videos(title,url) values($1,$2)", [title, url])
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => {
        res.sendStatus(500);
      });
    // data.push({ title, url, id: id++ });
  }
});
 //DATABASE_URL=postgres://cgfzxgopwadqxr:b0fa2df15237b13455250855053255d49f2a7999fa493fcdfa6250ba2d61fc69@ec2-34-242-84-130.eu-west-1.compute.amazonaws.com:5432/d3ncm116npf1r2 npm run start

app.get("/:id", (req, res) => {
  const videoId = req.params.id;
  client
    .query("SELECT * FROM videos WHERE id=$1", [videoId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  client
    .query("SELECT * FROM videos WHERE id= $1", [id])
    .then((result) => {
      if (result.rows.length === 0) res.status(404).send("Video doesn't exist");
      else {
        client
          .query("DELETE FROM videos WHERE id= $1", [id])
          .then((result) => {
            res.status(200).json({ message: "video deleted"});
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
  