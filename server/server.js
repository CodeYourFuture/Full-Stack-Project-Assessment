
const express = require("express");
const app = express();
 const cors = require ("cors");
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors());
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const videos = require("../exampleresponse.json"); 
app.use(express.json());
const { body, validationResult } = require("express-validator");
const port = process.env.PORT || 3000;
const { Pool } = require("pg");

// const db = new Pool({
//   user: "shadifakhri", 
//   host: "localhost",
//   database: "database",
//   password: "",
//   port: 5432,
// });

const db = new Pool({
  user: "shadi_user",
  host: "dpg-cjs7s5dv2qks738v6ltg-a.oregon-postgres.render.com",
  database: "shadi",
  password: "j7lLUQoGj3mMw7Q7gH66Nz3ygDizGews",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});


// app.get("/videos", function (req, res) {
//   if (videos.length === 0) {
//     return res.status(404).json({ error: "no videos found" });
//   }
//   res.json(videos);
// });

// GET "/videos"
app.get("/videos", async function (req, res) {
  const result = await db.query("SELECT * FROM videos");
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "no videos found" });
  }
  res.json(result.rows);
});

//ordering by assending and dessending for example /videos?order=asc
// app.get("/videos", function (req, res) {
//   if (videos.length === 0) {
//     return res.status(404).json({ error: "no videos found" });
//   }
//   const order = req.query.order;

//   let orderVideos;
//   if (order === "asc") {
//     orderVideos = videos.sort((a, b) => a.rating - b.rating);
//   } else {
//     // Default to descending order if order is not specified or is invalid
//     orderVideos = videos.sort((a, b) => b.rating - a.rating);
//   }

//   return res.json(orderVideos);
// });

//ordering by assending and dessending for example /videos?order=asc
// app.get("/videos", async function (req, res) {
//   const result = await db.query("SELECT * FROM videos");
//   if (result.rows.length === 0) {
//     return res.status(404).json({ error: "no videos found" });
//   }
//   const order = req.query.order;
//   let orderVideos;
  
//   if (order === "asc") {
//     orderVideos = result.rows.sort((a, b) => a.rating - b.rating);
//   } else if (order === "desc") {
//     orderVideos = result.rows.sort((a, b) => b.rating - a.rating);
//   } else {
//     return res.status(400).json({ error: "Invalid order parameter" });
//   }
//   return res.status(200).json(orderVideos);
//});


//ordering by assending and dessending for example /videos?order=asc
app.get("/videos", async function (req, res) {
  try {
    if (order !== "asc" && order !== "desc") {
      return res.status(400).json({ error: "Invalid order parameter" });
    }
    const order = req.query.order;
    let result;
    if (order === "asc") {
      result = await db.query("SELECT * FROM videos ORDER BY rating ASC");
    } else {
      result = await db.query("SELECT * FROM videos ORDER BY rating DESC");
    }
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});




//adding new video
// app.post(
//   "/videos",
//   [
//     body("title", "text can't be empty").notEmpty(),
//     body("url", "text can't be empty").notEmpty(),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({
//         error: errors.array(),
//       });
//     }
//     const newVideo = {
//       id: videos.length.toString(),
//       title: req.body.title,
//       url: req.body.url,
//        rating:req.body.rating
//     };
//     videos.push(newVideo);
//     res.status(201).json(videos);
//   }
// );

//adding new id
app.post(
  "/videos",
  [
    body("title", "text can't be empty").notEmpty(),
    body("url", "text can't be empty").notEmpty(),
    body("rating", " can't be empty").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array(),
      });
    }
    const newTitle = req.body.title;
    const newUrl = req.body.url;
    const newRating = req.body.rating;
    const query =
      //// Include "RETURNING *" to return the newly created row
      "INSERT INTO videos (title, url, rating) VALUES($1, $2, $3) RETURNING *";
    db.query(query, [newTitle, newUrl, newRating], (err,result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        const createdVideo = result.rows[0];
        res.status(201).json(createdVideo);
      }
    });
  }
);

//search video by query for example /videos/search?title=halleluja
app.get("/videos/search", function (req, res) {
  const searchVideo = req.query.title;
  const filteredVideo = videos.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  if (filteredVideo.length === 0) {
    res.status(404).json({ error: "No matching videos found" });
  }
  res.json(filteredVideo);
});


 //search video by id for example/videos/:id
// app.get("/videos/:id", function (req, res) {
//   const videoId = parseInt(req.params.id);
//   const video = videos.find((m) => m.id === videoId);
//   if (!video) {
//     return res.status(404).send({ error: "This id doesn't exist" });
//   }
//   res.status(200).json( video );
// });

//search video by id for example/videos/:id
app.get("/videos/:id", async function (req, res) {
  const videoId=req.params.id;
  const result = await db.query('SELECT * FROM videos where id=$1',[videoId]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "no videos found" });
  }
  res.json(result.rows);
});

// //updating video with id
// app.put("/videos/:id", function (req, res) {
//   const video = videos.find((m) => m.id == req.params.id);
//   if (!video) {
//     return res.status(404).json({
//       error: "This id doesn't exist",
//     });
//   }
//   const newVideos = videos.map((video) => {
//     if (video.id == req.params.id) {
//       return { ...video, ...req.body };
//     }
//     return video;
//   });
//   res.json({ data: newVideos });
// });

//updating video with id
app.put("/videos/:id",async function (req,res) {
  const newId = req.params.id;
  const newRating= req.body.rating;
  try{const result = db.query("UPDATE videos SET rating=$2 WHERE id=$1",[newId,newRating])
res.json(`video with id:${newId} updated`)}
catch(error){
  res.status(500).json({ error: "Internal Server Error" });
}
})

//delete video
// app.delete("/videos/:id", function (req, res) {
//   const video = videos.find((m) => m.id == req.params.id);
//   if (!video) {
//     res.status(404).json("This id doesn't exist");
//   }
//   const index = videos.indexOf(video);
//   videos.splice(index, 1);
//   res.json(videos);
// });

//deleting video
app.delete("/videos/:id", async function (req, res) {
  const videoId = req.params.id;
  try {
    const result = await db.query("DELETE FROM videos WHERE id=$1", [videoId]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json( `Video with id ${videoId} not found`);
    }
    res.json(`Video with id ${videoId} deleted`);
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));