const express = require("express");
const app = express();

// const fetch = require("node-fetch");

const cors = require("cors");
// //  production make the url safe
// const corsOptions = {
//   origin: ["https://ali-nasir-ali-full-stak-projct-assesm.netlify.app", "https://noembed.com"],
// };
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));

const { Client } = require("pg");
const client = new Client({
  host: "dpg-cjhmebd1a6cs73e76a30-a.oregon-postgres.render.com",
  user: "ali_nair_full_stack_assesment_database_user",
  port: 5432,
  password: "vGaZHMUG6MePFCc3pix7qG9MzDYsxa21",
  database: "ali_nair_full_stack_assesment_database",
  ssl: true,
});

client.connect((err) => {
  // if (err) throw err;
  console.log("Connected to database!");
});

app.get("/", (req, res) => {
  client.query(`SELECT * FROM videos ORDER BY title`, (error, response) => {
    if (!error) {
      res.json(response.rows);
    } else {
      console.log(error.message);
    }
    client.end;
  });
});

app.get("/:id", (req, res) => {
  let searchId = Number(req.params.id);

  client
    .query("SELECT * FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({
          result: "error",
          message: "Video not found",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "error",
        message: "Video not found",
      });

      client.end;
    });
});

app.delete("/:id", (req, res) => {
  let searchId = Number(req.params.id);

  client
    .query("DELETE FROM videos WHERE id = $1", [searchId])
    .then((result) => {
      res.status(200).json({});
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "error",
        message: "Video could not be removed",
      });

      client.end;
    });
});

//
app.put("/:id", (req, res) => {
  let searchId = Number(req.params.id);
  let inputRating = Number(req.body.rating);

  client
    .query("UPDATE videos SET rating = $2 WHERE id = $1", [searchId, inputRating])
    .then((result) => {
      res.status(200).json({});
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({
        result: "error",
        message: "Video rating could not be updated",
      });

      client.end;
    });
});

// UPDATE vote count
app.put("/:id/rating", async (req, res) => {
  try {
    const { id } = req.params;
    const voteType = req.query.voteType;
    const increment = voteType === "up" ? 1 : -1;
    const { rows } = await client.query("UPDATE videos SET rating = rating + $1 WHERE id = $2 RETURNING *", [increment, id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// // Create a new row in database

app.post("/", async (req, res) => {
  if (!req.body.url) {
    res.status(400).json({
      result: "error",
      message: "Video not saved",
    });
  } else {
    let shortUrlCode = req.body.url.split("=")[1];

    // getting tile
    async function getVideoTitle(videoUrl) {
      const endpoint = `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoUrl}`;

      try {
        const response = await fetch(endpoint, { mode: "no-cors" });
        const data = await response.json();
        return data.title;
      } catch (err) {
        throw err;
      }
    }
    let videoTitle = await getVideoTitle(shortUrlCode);

    // sending it to database
    try {
      const result = await client.query("SELECT MAX(id) FROM videos");
      let newId = result.rows[0].max + 1;
      let newTitle = videoTitle;
      let newUrl = shortUrlCode;
      let newRating = 0;

      try {
        await client.query("INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)", [newId, newTitle, newUrl, newRating]);
        res.status(201).json({
          id: newId,
        });
      } catch (error) {
        console.log(error.message);
        res.status(404).json({
          result: "error",
          message: "Video could not be added",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        result: "error",
        message: "Video could not be added",
      });
    }
  }
});
