const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const itemsPool = require("./DBConfig");

app.use(cors());

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

// const itemsPool = new Pool({
//   user: "ramo",
//   host: "dpg-cjmvldsdfrcc73cqdgj0-a",
//   database: "full_stack_assessment_database",
//   password: "QM8CiEFShmAod1u3wlJxKFzv0OPDmNaP",
//   port: "5432",
// });

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
    // You can perform additional testing or queries here
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
// .finally(() => {
// Close the database connection when done testing
// pool.end();
// }
// );

// app.get("/videos", (req, res) => {
//   itemsPool.query("SELECT * FROM videos", (error, results) => {
//     if (error) {
//       console.error("Error executing the database query:", error);
//       res.status(500).json({ error: "Database error" });
//     } else {
//       res.json(results.rows);
//     }
//   });
// });

// app.get("/", (req, res) => {
//   itemsPool.query("SELECT * FROM videos", (error, results) => {
//     res.json(results.rows);
//   });
// });

// // app.get("/", (req, res) => {
// //   res.send("Hi");
// // });

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

app.use(express.json());

// // GET "/"
// // app.get("/", (req, res) => {
// //   res.json(videos);
// // });

// // app.get("/api/items", async (req, res) => {
// //   try {
// //     const allItems = await itemsPool.query("SELECT * FROM items");
// //     res.json({ allItems });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send(error.message);
// //   }
// // });

// // app.post("/", (req, res) => {
// //   const title = req.body.title;
// //   const url = req.body.url;

// //   if (!title || !url) {
// //     res.status(400).json({
// //       result: "failure",
// //       message: "Video could not be saved",
// //     });
// //   }
// //   const id = videos.length + 1;

// //   const newVideo = { id, ...req.body, rating: 0 };
// //   console.log(req.body);
// //   videos.push(newVideo);
// //   res.status(201).send({ id: newVideo.id });
// // });

// // app.get("/:id", (req, res) => {
// //   const videoId = parseInt(req.params.id);

// //   const video = videos.find((video) => video.id === videoId);

// //   res.status(200).send({ video });
// // });

// // app.delete("/:id", (req, res) => {
// //   const videoId = parseInt(req.params.id);

// //   const videoIndex = videos.findIndex((video) => video.id === videoId);

// //   if (videoIndex !== -1) {
// //     videos.splice(videoIndex, 1);
// //     return res.status(200).json({});
// //   } else {
// //     return res
// //       .status(400)
// //       .json({ result: "failure", message: "Video could not be deleted" });
// //   }
// // });
