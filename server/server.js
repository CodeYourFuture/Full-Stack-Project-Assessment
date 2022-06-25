// Modify server.js to read SQL Table 'videos-table'

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Body Parser Middleware
app.use(express.json());

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// console.log(process.env.DATABASE_URL);

client.connect();

app.use(cors());

const port = process.env.PORT || 3004;

// GET - This endpoint is used to return all of the videos

app.get("/", function (request, response) {
  let query = "SELECT * FROM videos_table";

  client
    .query(query)
    .then((result) => {
      let reply = result.rows;
      if (reply.length === 0) {
        return response.status(400).json({
          result: "failure",
          message: `SERVER ERROR: The Database is empty!`,
        });
      }

      return response.json(reply);
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ result: "failure", message: error });
    });
});

/*
  `GET` "/{id}" - Returns the video with the ID contained within the `{id}` parameter
*/

app.get("/:id", (request, response) => {
  const reqID = Number(request.params.id);
  if (Number.isNaN(reqID) || !Number.isSafeInteger(reqID) || reqID <= 0) {
    return response.status(400).json({
      result: "failure",
      message: `'${request.params.id}' has been rejected because an ID must be a positive, nonzero integer.`,
    });
  }

  let query = "SELECT * FROM videos_table WHERE id = $1";

  client
    .query(query, [reqID])
    .then((result) => {
      let reply = result.rows;
      if (reply.length === 0) {
        return response.status(400).json({
          result: "failure",
          message: `No video with the ID '${request.params.id}' exists.`,
        });
      }
      return response.json(reply);
    })
    .catch((error) => {
      return response.status(500).json({ result: "failure", message: error });
    });
});

/*
POST - This endpoint is used to add a video to the API.

FORMAT EXPECTED
{
  "title": "string",
  "url": "string"
  "rating": number;
}

#### Example Response

If successful returns the new ID number:

{
  "id": a number > 0
}


If not successful

{
  {result: "failure",
  message: 'Error message'
}

Tested with Postman
*/

app.post("/", (request, response) => {
  const { title, url } = request.body; // Destructuring

  if (!title || !url) {
    return response.status(400).json({
      result: failure,
      message: `Error: ensure that both the 'title' and 'url' fields are not blank.`,
    });
  } else {
    // Insert New Record into the SQL Database
    let timestamp = Date.now();
    const query = `INSERT INTO videos_table (title, url, rating, timestamp) VALUES ($1, $2, $3, $4)
                     RETURNING id`;
    client
      .query(query, [title, url, 0, timestamp])
      .then((result) => response.json({ id: result.rows[0].id })) // Return the id of the new entry
      .catch((error) => {
        console.error(error);
        return response.status(500).json({ result: "failure", message: error });
      });
  }
  return;
});

/*
`DELETE` "/{id}" - Deletes the video with the ID container within the `{id}` parameter
Tested with Postman
*/

app.delete("/:id", (request, response) => {
  const reqID = Number(request.params.id);
  if (Number.isNaN(reqID) || !Number.isSafeInteger(reqID) || reqID <= 0) {
    return response.status(400).json({
      result: "failure",
      message: `'${request.params.id}' has been rejected because an ID must be a positive, nonzero integer.`,
    });
  }

  client
    .query("SELECT * FROM videos_table WHERE id=$1", [reqID])
    .then((result) => {
      if (result.rows.length === 0) {
        return response.status(400).json({
          result: "failure",
          message: `Video could not be deleted because no video with the ID '${reqID}' exists.`,
        });
      } else {
        client
          .query("DELETE FROM videos_table WHERE id=$1", [reqID])
          .then(() => response.json({})) // Denotes success)
          .catch((error) => {
            console.error(error);
            response.status(500).json({ result: "failure", message: error });
          });
      }
    });
  return;
});

// app.listen(process.env.PORT);

app.listen(port, () =>
  console.log(`Your Backend Service is Running; listening on port ${port}`)
);
