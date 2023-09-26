// update8.this version has databse connection and in videotable.sql sql code.
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL database connection
const db = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOSTNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT, // test to add
  // port: 5432,
});

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", async (req, res) => {
  try {
    const order = req.query.order || "desc";

    let query = "SELECT * FROM videos";
    if (order === "asc") {
      query += " ORDER BY rating ASC";
    } else {
      query += " ORDER BY rating DESC";
    }

    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/videos", async (req, res) => {
  try {
    const newVideo = req.body;
    const timestamp = new Date().toISOString();

    const query =
      "INSERT INTO videos (title, url, rating, timestamp) VALUES ($1, $2, $3, $4) RETURNING id";
    const values = [newVideo.title, newVideo.url, 0, timestamp];

    const result = await db.query(query, values);
    const insertedVideoId = result.rows[0].id;

    res.json({ id: insertedVideoId });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/videos/:id/upvote", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const query = "UPDATE videos SET rating = rating + 1 WHERE id = $1";
    const values = [id];

    await db.query(query, values);
    res.json({ message: "Upvoted successfully" });
  } catch (error) {
    console.error("Error upvoting video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/videos/:id/downvote", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const query =
      "UPDATE videos SET rating = GREATEST(rating - 1, 0) WHERE id = $1";
    const values = [id];

    await db.query(query, values);
    res.json({ message: "Downvoted successfully" });
  } catch (error) {
    console.error("Error downvoting video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/videos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const query = "DELETE FROM videos WHERE id = $1";
    const values = [id];

    await db.query(query, values);
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//update 7. here is all working but not connected to postgresql and has a hardcopy
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send({ express: "Your Backend Service is Running" });
// });

// app.get("/videos", (req, res) => {
//   const order = req.query.order || "desc";

//   let orderedVideos = [...videos];
//   if (order === "asc") {
//     orderedVideos.sort((a, b) => a.rating - b.rating);
//   } else {
//     orderedVideos.sort((a, b) => b.rating - a.rating);
//   }

//   res.json(orderedVideos);
// });

// app.post("/videos", (req, res) => {
//   const newVideo = req.body;
//   newVideo.id = videos.length + 1;
//   newVideo.uploadedDate = new Date().toISOString();
//   videos.push(newVideo);
//   res.json({ id: newVideo.id });
// });

// app.post("/videos/:id/upvote", (req, res) => {
//   const id = parseInt(req.params.id);
//   const video = videos.find((v) => v.id === id);
//   if (video) {
//     video.rating += 1;
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// app.post("/videos/:id/downvote", (req, res) => {
//   const id = parseInt(req.params.id);
//   const video = videos.find((v) => v.id === id);
//   if (video) {
//     video.rating = Math.max(video.rating - 1, 0);
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// app.delete("/videos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const initialLength = videos.length;
//   videos = videos.filter((v) => v.id !== id);
//   if (videos.length < initialLength) {
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// // Serve static files from the 'build' folder (React frontend)
// app.use(express.static(path.join(__dirname, "build")));

// // Serve the index.html file as the default route
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));

// update6
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// let videos = [

//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// app.get(
//   "https://back-end-full-stack-project-assessment.onrender.com/",
//   (req, res) => {
//     res.send({ express: "Your Backend Service is Running" });
//   }
// );

// app.get(
//   "https://back-end-full-stack-project-assessment.onrender.com/videos",
//   (req, res) => {
//     const order = req.query.order || "desc";

//     let orderedVideos = [...videos];
//     if (order === "asc") {
//       orderedVideos.sort((a, b) => a.rating - b.rating);
//     } else {
//       orderedVideos.sort((a, b) => b.rating - a.rating);
//     }

//     res.json(orderedVideos);
//   }
// );

// app.post(
//   "https://back-end-full-stack-project-assessment.onrender.com/videos",
//   (req, res) => {
//     const newVideo = req.body;
//     newVideo.id = videos.length + 1;
//     newVideo.uploadedDate = new Date().toISOString();
//     videos.push(newVideo);
//     res.json({ id: newVideo.id });
//   }
// );

// app.post(
//   "https://back-end-full-stack-project-assessment.onrender.com/videos/:id/upvote",
//   (req, res) => {
//     const id = parseInt(req.params.id);
//     const video = videos.find((v) => v.id === id);
//     if (video) {
//       video.rating += 1;
//       res.json({});
//     } else {
//       res.status(404).json({ result: "failure", message: "Video not found" });
//     }
//   }
// );

// app.post(
//   "https://back-end-full-stack-project-assessment.onrender.com/videos/:id/downvote",
//   (req, res) => {
//     const id = parseInt(req.params.id);
//     const video = videos.find((v) => v.id === id);
//     if (video) {
//       video.rating = Math.max(video.rating - 1, 0);
//       res.json({});
//     } else {
//       res.status(404).json({ result: "failure", message: "Video not found" });
//     }
//   }
// );

// app.delete(
//   "https://back-end-full-stack-project-assessment.onrender.com/videos/:id",
//   (req, res) => {
//     const id = parseInt(req.params.id);
//     const initialLength = videos.length;
//     videos = videos.filter((v) => v.id !== id);
//     if (videos.length < initialLength) {
//       res.json({});
//     } else {
//       res.status(404).json({ result: "failure", message: "Video not found" });
//     }
//   }
// );

// app.get(
//   "https://back-end-full-stack-project-assessment.onrender.com/video",
//   (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "links.html"));
//   }
// );

// app.use(express.static(path.join(__dirname, "public")));

// app.listen(port, () => console.log(`Listening on port ${port}`));

// update5
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json()); // Parse JSON request bodies

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send({ express: "Your Backend Service is Running" });
// });

// app.get("/videos", (req, res) => {
//   const order = req.query.order || "desc"; // Get the 'order' query parameter, default to 'desc'

//   let orderedVideos = [...videos];
//   if (order === "asc") {
//     orderedVideos.sort((a, b) => a.rating - b.rating);
//   } else {
//     orderedVideos.sort((a, b) => b.rating - a.rating);
//   }

//   res.json(orderedVideos);
// });

// app.post("/videos", (req, res) => {
//   const newVideo = req.body;
//   newVideo.id = videos.length + 1;
//   newVideo.uploadedDate = new Date().toISOString();
//   videos.push(newVideo);
//   res.json({ id: newVideo.id });
// });

// app.post("/videos/:id/upvote", (req, res) => {
//   const id = parseInt(req.params.id);
//   const video = videos.find((v) => v.id === id);
//   if (video) {
//     video.rating += 1;
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// app.post("/videos/:id/downvote", (req, res) => {
//   const id = parseInt(req.params.id);
//   const video = videos.find((v) => v.id === id);
//   if (video) {
//     video.rating = Math.max(video.rating - 1, 0);
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// app.delete("/videos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const initialLength = videos.length;
//   videos = videos.filter((v) => v.id !== id);
//   if (videos.length < initialLength) {
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));

//update4 - this code display html in front end and back end ok
// const express = require("express");
// const cors = require("cors"); // Import the cors package
// const app = express();
// const port = process.env.PORT || 5000;

// // cors middleware to allow cross-origin requests
// app.use(cors());

// // Store and retrieve your videos from here
// // If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// // GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

// // GET "/videos"
// app.get("/videos", (req, res) => {
//   res.json(videos);
// });

// // POST "/videos"
// app.post("/videos", (req, res) => {
//   const newVideo = req.body;
//   newVideo.id = videos.length + 1; // Assign a new ID
//   videos.push(newVideo);
//   res.json({ id: newVideo.id });
// });

// // POST "/videos/:id/upvote"
// app.post("/videos/:id/upvote", (req, res) => {
//   const id = parseInt(req.params.id);
//   const video = videos.find((v) => v.id === id);
//   if (video) {
//     video.rating += 1;
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// // POST "/videos/:id/downvote"
// app.post("/videos/:id/downvote", (req, res) => {
//   const id = parseInt(req.params.id);
//   const video = videos.find((v) => v.id === id);
//   if (video) {
//     video.rating = Math.max(video.rating - 1, 0);
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// // DELETE "/videos/:id"
// app.delete("/videos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const initialLength = videos.length;
//   videos = videos.filter((v) => v.id !== id);
//   if (videos.length < initialLength) {
//     res.json({});
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));

// update3 -does not display videos only add videos
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send({ express: "Your Backend Service is Running" });
// });

// app.get("/videos", (req, res) => {
//   res.json(videos);
// });

// app.get("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const video = videos.find((video) => video.id === videoId);

//   if (video) {
//     res.json(video);
//   } else {
//     res.status(404).json({ error: "Video not found" });
//   }
// });

// app.use(express.json());

// app.post("/videos", (req, res) => {
//   const newVideo = req.body;

//   if (!newVideo.title || !newVideo.url) {
//     res.status(400).json({
//       result: "failure",
//       message: "Title and URL are required",
//     });
//     return;
//   }

//   newVideo.id = Date.now();
//   newVideo.timestamp = new Date().toISOString();
//   videos.push(newVideo);

//   res.status(201).json({ id: newVideo.id });
// });

// app.delete("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const index = videos.findIndex((video) => video.id === videoId);

//   if (index !== -1) {
//     videos.splice(index, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ result: "failure", message: "Video not found" });
//   }
// });

// update2 - does not work
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// let videos = [];

// app.get("/", (req, res) => {
//   res.send({ express: "Your Backend Service is Running" });
// });

// app.get("/videos", (req, res) => {
//   res.json(videos);
// });

// app.get("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const video = videos.find((video) => video.id === videoId);

//   if (video) {
//     res.json(video);
//   } else {
//     res.status(404).json({ error: "Video not found" });
//   }
// });

// app.use(express.json());

// app.post("/videos", (req, res) => {
//   const newVideo = req.body;

//   // Validate request data
//   if (!newVideo.title || !newVideo.url) {
//     res.status(400).json({
//       result: "failure",
//       message: "Title and URL are required",
//     });
//     return;
//   }

//   newVideo.id = Date.now();
//   newVideo.timestamp = new Date().toISOString();
//   videos.push(newVideo);

//   res.status(201).json({ id: newVideo.id });
// });

// app.delete("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const index = videos.findIndex((video) => video.id === videoId);

//   if (index !== -1) {
//     videos.splice(index, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ error: "Video not found" });
//   }
// });

// update1
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// let videos = [];

// app.get("/", (req, res) => {
//   res.send({ express: "Your Backend Service is Running" });
// });

// app.get("/videos", (req, res) => {
//   res.json(videos);
// });

// app.get("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const video = videos.find((video) => video.id === videoId);

//   if (video) {
//     res.json(video);
//   } else {
//     res.status(404).json({ error: "Video not found" });
//   }
// });

// app.use(express.json());

// app.post("/videos", (req, res) => {
//   const newVideo = req.body;
//   newVideo.id = Date.now();
//   newVideo.timestamp = new Date().toISOString();
//   videos.push(newVideo);

//   res.status(201).json(newVideo);
// });

// app.delete("/videos/:id", (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const index = videos.findIndex((video) => video.id === videoId);

//   if (index !== -1) {
//     videos.splice(index, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ error: "Video not found" });
//   }
// });

// original
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// // Store and retrieve your videos from here
// // If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// // GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });
