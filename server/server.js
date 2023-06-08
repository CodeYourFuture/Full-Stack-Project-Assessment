const express = require("express");
const pool = require("./config/dbSqlConn");
const app = express();
const cors = require("cors");

const vidData = require("./exampleresponse.json");
const port = process.env.PORT || 5000;

let videos = [...vidData];

function getNewUniqueId(array) {
  const min = 1000;
  const max = 9999;
  let newId;
  do {
    newId = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (array.some((obj) => obj.id === newId));
  return newId;
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", async (req, res) => {
  const query = "SELECT * FROM videos ORDER BY id DESC;";

  try {
    const { rows } = await pool.query(query);
    const vidData = rows;

    res.json({ allVideoes: "all videoes", videoes: vidData });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal server error");
  }
});

app.post("/videos", (req, res) => {
  const error = {
    result: "failure",
    message: "Video could not be saved",
  };
  if (!req.body) {
    return res.json({
      videoAddError: {
        result: "failure",
        message: "Video could not be saved",
      },
    });
  }

  const uniId = getNewUniqueId(videos);
  console.log(req.body);
  const title = req.body.title;
  const url = req.body.url_link;
  const rating = 0;
  const newVidToAdd = {
    id: uniId,
    title,
    url_link: url,
    rating,
  };
  const query = `INSERT INTO videos (id, title, url_link, rating, likes)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  pool
    .query(query, [uniId, title, url, rating, rating])
    .then((result) => {
      const newVid = result.rows[0];

      res.json({
        addedData: { info: "new video added", uniqueId: `${uniId}`, videoAdded: newVidToAdd },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
});

app.delete("/videos/:idp", (req, res) => {
  const error = {
    result: "failure",
    message: "Video could not be deleted",
  };
  if (!req) {
    return res.json({
      videoAddError: {
        result: "failure",
        message: "Video could not be deleted",
      },
    });
  }
  const idInPram = req.params.idp;

  const query = "DELETE FROM videos WHERE id = $1 RETURNING *";

  pool
    .query(query, [idInPram])
    .then((result) => {
      const deletedVid = result.rows[0];
      if (!deletedVid)
        return res.status(404).json({
          videoAddError: {
            result: "failure",
            message: "Video could not be found",
          },
        });

      res.json({ allVideoes: { info: " video deleted", videoId: `${idInPram}` } });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
});

app.get("/videos/:idp", async (req, res) => {
  const idInPram = req.params.idp;
  const error = {
    result: "failure",
    message: "Video could not be found",
  };

  try {
    const query = "SELECT * FROM videos WHERE id = $1";
    const values = [idInPram];
    const { rows } = await pool.query(query, values);
    const result = rows[0];

    if (!result)
      return res.status(404).json({
        videoAddError: {
          result: "failure",
          message: "Video could not be found",
        },
      });

    res.json({ videoInfo: "one video", videoes: result });
  } catch (err) {
    console.log(err);
    res.status(500).json(error);
  }
});

app.put("/videos/:idp", (req, res) => {
  const error = {
    result: "failure",
    message: "Video could not be updatedd",
  };
  if (!req.body) {
    return res.json({
      videoAddError: {
        result: "failure",
        message: "Video could not be saved",
      },
    });
  }
  const id = req.params.idp;
  const rating = req.body.rating;

  const query = `UPDATE videos SET rating = $1 WHERE id = $2 RETURNING *`;

  pool
    .query(query, [rating, id])
    .then((result) => {
      const newVid = result.rows[0];
      res.json({
        updatedData: { info: "new video updated", uniqueId: `${id}` },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
