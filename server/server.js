const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const localVideosFile = require("../exampleresponse.json");
const { Pool } = require("pg");

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// POSTGRES CONNECTOR
const db = new Pool({
  user: "codeyourfuture",
  host: "localhost",
  database: "fullstackproject",
  password: "cyf123",
  port: 5432,
});

app.get("/", (request, response) => {
  // console.log(request.body);
  db.query("SELECT * FROM videos", (error, results) => {
    if (error) {
      throw error;
    } else {
      response.json(results.rows);
    }
  });
});

app.get("/:id", (request, response) => {
    const body = request.body;

  // const returnVideo = localVideosFile.filter(video => video.id == request.params.id)
  // response.json(returnVideo);
  db.query(
    "SELECT * FROM videos WHERE id=$1",
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        response.json(results.rows);
      }
    }
  );
});


app.post("/", (request, response) => {
  const body = request.body;

  if (body["title"] && body["url"]) {
    // localVideosFile.push({
    //   id: Math.floor(Math.random() * 100000),
    //   title: body["title"],
    //   url: body["url"],
    // });
    if (!body["id"] && !body["rating"]) {
      db.query(
        "INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)",
        [Math.floor(Math.random() * 100000), body["title"], body["url"], 0],
        (error, results) => {
          if (error) {
            throw error;
          } else {
            response.json("SUCCESS : Added a random id and rating of 0");
          }
        }
      );
    } else {
      db.query(
        "INSERT INTO videos (id, title, url, rating) VALUES ($1, $2, $3, $4)",
        [body["id"], body["title"], body["url"], body["rating"]],
        (error, results) => {
          if (error) {
            throw error;
          } else {
            response.json("SUCCESS : ALL GOOD");
          }
        }
      );
    }

    // console.log(localVideosFile[localVideosFile.length - 1]);
    // response.json(localVideosFile[localVideosFile.length - 1].id);
  } else {
    response.json({
      result: "failure",
      message: "Video could not be saved",
    });
  }
});

app.delete("/:id", (request, response) => {
  console.log(request.body);
  // let videoArrayLengthBefore = localVideosFile.length;
  // const returnVideo = localVideosFile.filter((video, index) => {
  //   if (video.id == request.params.id) {
  //     localVideosFile.splice(index,1);
  //   }
  // }
  // );
  // if (videoArrayLengthBefore === localVideosFile.length) {
  //   response.json({
  //     result: "failure",
  //     message: "Video could not be deleted",
  //   });

  // } else {
  //   console.log(localVideosFile);
  //   response.json("DELETED");
  // }

  db.query(
    "DELETE FROM videos WHERE id=$1",
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        response.json(results.rows);
      }
    }
  );
});

// Level 300 complete
// ERROR IDENTIFIED!
// 127.0.0.1:5000 --> WORKS FINE
// localhost:5000 --> KEEPS FAILING (eventhough should be interchangeable)
