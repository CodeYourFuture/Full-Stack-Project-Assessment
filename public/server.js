const express = require("express");
const cors = require("cors");

const app = express();

let fs = require("fs"); // Used to update the database locally

app.use(cors());

// Body Parser Middleware
app.use(express.json());

// This library is used to Generate unique IDs
// Node.js require
const ShortUniqueId = require("short-unique-id");
// Instantiate for 8 character UUIDs

const uid = new ShortUniqueId({ length: 8 });
uid.setDictionary("alphanum_lower");

const port = process.env.PORT || 3004;

const path = require("path");

// LOAD THE DATABASE
const filename = path.resolve(__dirname, "data/database.json");

//This array is the "data store".
videoDatabase = JSON.parse(fs.readFileSync(filename));

let newId;

// GET - This endpoint is used to return all of the videos

app.get("/", function (request, response) {
  response.send(videoDatabase);
});

/*
  `GET` "/{id}" - Returns the video with the ID contained within the `{id}` parameter
*/

app.get("/:id", (request, response) => {
  let reqId = request.params.id;
  if (reqId.length !== 8) {
    return response.status(400).json({
      result: "failure",
      message: `'${request.params.id}' must be 8 characters long`,
    });
  }

  let theVideoIndex = videoDatabase.findIndex(({ id }) => id === reqId);
  if (theVideoIndex < 0) {
    return response.status(400).json({
      result: "failure",
      message: `No video with the ID '${request.params.id}' exists`,
    });
  }
  response.json(videoDatabase[theVideoIndex]); // Return selected video
});

/*
POST - This endpoint is used to add a video to the API.

FORMAT EXPECTED
{
  "title": "",
  "url": ""
}

#### Example Response

If successful:

{
  "id": 8 CHARACTERS
}


If not successful

{
  "result": "failure",
  "message": "Video could not be saved"
}

Tested with Postman
*/

app.post("/", (request, response) => {
  const { title, url } = request.body; // Destructuring

  if (!title || !url) {
    return response.status(400).json({
      result: failure,
      message: `Error: ensure that both the 'title' and 'url' fields are not blank`,
    });
  } else {
    // Ensure 'id' is unique

    while (true) {
      newId = uid(); // Generate a unique ID
      if (!videoDatabase.some((element) => element.id === newId)) break;
    }

    videoDatabase.push({
      id: newId,
      title: title,
      url: url,
      timestamp: Date.now(),
      rating: 0,
    });

    response.json({ id: newId }); // Return the id of the new entry

    // Update locally
    fs.writeFileSync(filename, JSON.stringify(videoDatabase), function (err) {
      if (err) throw err;
    });
    // console.log("The file was saved!");
  }
});

/*
`DELETE` "/{id}" - Deletes the video with the ID container within the `{id}` parameter
Tested with Postman
*/

app.delete("/:id", (request, response) => {
  let reqId = request.params.id;
  if (reqId.length !== 8) {
    return response.status(400).json({
      result: "failure",
      message: `'${reqId}' must be 8 characters long`,
    });
  }

  let theVideoIndex = videoDatabase.findIndex(({ id }) => id === reqId);
  if (theVideoIndex < 0) {
    return response.status(400).json({
      result: "failure",
      message:
        "Video could not be deleted because no video with the ID '${reqId}' exists`",
    });
  }

  videoDatabase.splice(theVideoIndex, 1); // The Video has been removed IN PLACE!

  response.json({}); // Denotes success

  // Update locally
  fs.writeFile(filename, JSON.stringify(videoDatabase), function (err) {
    if (err) throw err;
    // console.log("Successful deletion");
  });
});

// app.listen(process.env.PORT);

app.listen(port, () =>
  // console.log(`Listening on port ${port}`)
  console.log("Your Backend Service is Running")
);
