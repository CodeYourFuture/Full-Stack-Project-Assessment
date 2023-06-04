const express = require("express");
const pool = require("./config/dbSqlConn");
const app = express();
const cors = require("cors");
//const bodyParser = require("body-parser");
const vidData = require("./exampleresponse.json");
const port = process.env.PORT || 5000;

//console.log("pool", pool);

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [...vidData];
// - - functions - - //
function getNewUniqueId(array) {
  // request an array of ids from the database
  //or check the lenth of of he object array
  const min = 1000; // Minimum 6-digit number (inclusive)
  const max = 9999; // Maximum 6-digit number (inclusive)
  let newId;
  do {
    newId = Math.floor(Math.random() * (max - min + 1)) + min; // generate a random number between 1 and 1000
  } while (array.some((obj) => obj.id === newId)); // check if the id already exists in the array
  return newId;
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// express has its own body prarser
//app.use(bodyParser.json());
// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

/* app.use("/videos", require("./routes/api/videos")); */

//example routes

app.get("/videos", async (req, res) => {
  //const query = "SELECT * FROM tableName;";
  // to return query in consitsten order
  // DESC is the same as heighes first and lowest last
  // - with time the most recent point is the highest
  //const query = "SELECT * FROM videos ORDER BY id DESC;";
  const query = "SELECT * FROM videos ORDER BY id DESC;";
  // table and row names are not dynamic
  try {
    const { rows } = await pool.query(query);
    const vidData = rows;
    //console.log({ vidData });
    res.json({ allVideoes: "all videoes", videoes: vidData });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal server error");
  }
});

/* app.get("/videos", (req, res) => {
  res.json({ allVideoes: "all videoes", videoes: vidData });
}); */

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

  //const id = req.body.id;
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
      console.log({ newVid });
      //res.status(201).send("Created a new customer");
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
      console.log({ deletedVid });
      if (!deletedVid)
        return res.status(404).json({
          videoAddError: {
            result: "failure",
            message: "Video could not be found",
          },
        });
      //res.status(201).send("Created a new customer");
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

  //const id = req.body.id;
  const id = req.params.idp;
  console.log({ id });
  const rating = req.body.rating;
  console.log({ rating });

  const query = `UPDATE videos SET rating = $1 WHERE id = $2 RETURNING *`;

  pool
    .query(query, [rating, id])
    .then((result) => {
      const newVid = result.rows[0];
      console.log({ newVid });
      //res.status(201).send("Created a new customer");
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
