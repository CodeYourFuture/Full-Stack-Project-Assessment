require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg")
const bodyParser = require("body-parser");
// const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//getting all the data

app.get("/", async (request, response) => {
  try {
    const getQuery = "SELECT id, title, link, rating FROM videos"

    const result = await db.query(getQuery);

    response.status(200).json({
      "result": true, "video": result.rows
    })
  }
  catch (error) {
    response.status(400).json({
      "result": false,
      "message": "threre is a problem with  loading of the  page we will sort it out soon"
    })
  };
});

////*****DELETING VIDIO******///////
app.delete("/:id", async (request, response) => {
  try {
    let videoID = +request.params.id;

    if (!videoID) {
      return response.status(400).json({ "result": "failure", "message": "there is an error, this Id is not exist " })
    }

    const deleteQuery = "DELETE FROM videos WHERE id=$1";
    await db.query(deleteQuery, [videoID])

    const getvidesquery = "SELECT id, title, link, rating FROM videos"
    const result = await db.query(getvidesquery)

    response.status(200).json({ "result": "success", message: `Video  deleted successfully `, video: result.rows })

  }
  catch (error) {
    response.status(400).json({
      "result": false,
      "message": "there is an arror with deleting this video"
    })
  }
});

/////******POST NEW VIDEO *******////
app.post("/", async (request, response) => {
  let randomID = Math.floor(Math.random() * 90000) + 10000;

  try {
    const { title, url } = request.body;
    const requiredObject = {
      id: randomID,
      title,
      url,
      rating: "0",
    };

    let postValue = Object.values(requiredObject)

    const postquery =
      `INSERT INTO videos (id, title, link,rating)
        VALUES ($1, $2, $3, $4)`;
    await db.query(postquery, postValue)

    const getvidesquery = "SELECT id, title, link, rating FROM videos"
    const result = await db.query(getvidesquery)

    response.status(200).json({ "result": true, message: `Video  added successfully `, video: result.rows })

  }
  catch {
    response.status(400).json({
      "result": false,
      "message": "there is an arror with posting this video"
    })
  }
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));