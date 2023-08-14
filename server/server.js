// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(cors());
// app.listen(port, () => console.log(`Listening on port ${port}`));

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/embed/HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/embed/FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/embed/xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/embed/4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/embed/gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/embed/RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/embed/U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/embed/X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/embed/ZacOS8NBK6U",
//     rating: 73,
//   },
// ];

// // GET "/"
// app.get("/", (req, res) => {
//   res.send(videos);
// });

// //POST "/"
// app.post("/", function (req, res) {
//   const { title, url } = req.body;

//   if (!title || !url) {
//     return res.status(400).json({
//       result: "failure",
//       message: "Video could not be saved",
//     });
//   } else {
//     const newVideoId = videos.length + 1;
//     const newVideo = {
//       id: newVideoId,
//       title,
//       url,
//       rating: 0,
//     };
//     // Adding the new video to the videos array
//     videos.push(newVideo);
//     res
//       .status(201)
//       .send(`The new video with the id ${newVideo.id} has been added`);
//   }
// });

// // GET "/{id}"
// app.get("/:id", function (req, res) {
//   const videoId = Number(req.params.id);
//   const searchedVideo = videos.find((video) => video.id === videoId);

//   if (searchedVideo) {
//     res.send(searchedVideo);
//   } else {
//     res.status(404).json({
//       result: "failure",
//       message: `Video with ID ${videoId} not found`,
//     });
//   }
// });

// // DELETE "/:id"
// app.delete("/:id", function (req, res) {
//   const videoId = Number(req.params.id);
//   const initialVideosLength = videos.length;
//   videos = videos.filter((video) => video.id !== videoId);

//   if (videos.length < initialVideosLength) {
//     res.send(`Video with ID ${videoId} deleted successfully.`);
//   } else {
//     const failureMessage = {
//       result: "failure",
//       message: "Video could not be deleted",
//     };
//     res.status(404).json(failureMessage);
//   }
// });

// // PUT "/:id/rating"
// app.put("/:id/rating", function (req, res) {
//   const videoId = Number(req.params.id);
//   const rating = req.body.rating;

//   if (rating !== 1 && rating !== -1) {
//     return res.status(400).json({
//       result: "failure",
//       message: "Invalid rating value. Only +1 or -1 allowed.",
//     });
//   }

//   const video = videos.find((video) => video.id === videoId);

//   if (video) {
//     video.rating += rating;
//     res.send(`Updated rating for the video with ID ${videoId}`);
//   } else {
//     res.status(404).json({
//       result: "failure",
//       message: `Video with ID ${videoId} not found`,
//     });
//   }
// });



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const uri =
  "mongodb+srv://nataliiazab:NATALIIAZAB1408@cluster-nataliiazab-fsp.ytyzgik.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const collectionName = "videos";

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("cluster-nataliiazab-fsp");
    const collection = database.collection(collectionName);

    // Delete the collection with previous videos
    await collection.drop();
    console.log("Collection deleted");

    //insert the videos into the collection
    const initialVideos = [
      {
        id: 523523,
        title: "Never Gonna Give You Up",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        rating: 23,
      },
      {
        id: 523427,
        title: "The Coding Train",
        url: "https://www.youtube.com/embed/HerCR8bw_GE",
        rating: 230,
      },
      {
        id: 82653,
        title: "Mac & Cheese | Basics with Babish",
        url: "https://www.youtube.com/embed/FUeyrEN14Rk",
        rating: 2111,
      },
      {
        id: 858566,
        title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
        url: "https://www.youtube.com/embed/xbs7FT7dXYc",
        rating: 11,
      },
      {
        id: 453538,
        title:
          "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
        url: "https://www.youtube.com/embed/4As0e4de-rI",
        rating: 3211,
      },
      {
        id: 283634,
        title: "Learn Unity - Beginner's Game Development Course",
        url: "https://www.youtube.com/embed/gB1F9G0JXOo",
        rating: 211,
      },
      {
        id: 562824,
        title: "Cracking Enigma in 2021 - Computerphile",
        url: "https://www.youtube.com/embed/RzWB5jL5RX0",
        rating: 111,
      },
      {
        id: 442452,
        title: "Coding Adventure: Chess AI",
        url: "https://www.youtube.com/embed/U4ogK0MIzqk",
        rating: 671,
      },
      {
        id: 536363,
        title: "Coding Adventure: Ant and Slime Simulations",
        url: "https://www.youtube.com/embed/X-iSQQgOd1A",
        rating: 76,
      },
      {
        id: 323445,
        title: "Why the Tour de France is so brutal",
        url: "https://www.youtube.com/embed/ZacOS8NBK6U",
        rating: 73,
      },
    ];
    await collection.insertMany(initialVideos);
    console.log("Initial videos inserted");

    app.get("/", async (req, res) => {
      const videos = await collection.find().toArray();
      res.send(videos);
    });

    app.post("/", async (req, res) => {
      const { title, url } = req.body;

      if (!title || !url) {
        return res.status(400).json({
          result: "failure",
          message: "Video could not be saved",
        });
      } else {
        const maxIdVideo = await collection.findOne({}, { sort: { id: -1 } });

        let newId = 1;
        if (maxIdVideo) {
          newId = maxIdVideo.id + 1;
        }
        const newVideo = {
          id: newId,
          title,
          url,
          rating: 0,
        };

        await collection.insertOne(newVideo);
        res.status(201).send(`The new video has been added`);
      }
    });

    app.get("/:id", async (req, res) => {
      const videoId = Number(req.params.id);
      const searchedVideo = await collection.findOne({ id: videoId });

      if (searchedVideo) {
        res.send(searchedVideo);
      } else {
        res.status(404).json({
          result: "failure",
          message: `Video with ID ${videoId} not found`,
        });
      }
    });

    app.delete("/:id", async (req, res) => {
      const videoId = Number(req.params.id);
      const deleteResult = await collection.deleteOne({ id: videoId });

      if (deleteResult.deletedCount === 1) {
        res.send(`Video with ID ${videoId} deleted successfully.`);
      } else {
        res.status(404).json({
          result: "failure",
          message: `Video with ID ${videoId} not found or could not be deleted`,
        });
      }
    });

    app.put("/:id/rating", async (req, res) => {
      const videoId = Number(req.params.id);
      const rating = req.body.rating;

      if (rating !== 1 && rating !== -1) {
        return res.status(400).json({
          result: "failure",
          message: "Invalid rating value. Only +1 or -1 allowed.",
        });
      }

      const updateResult = await collection.updateOne(
        { id: videoId },
        { $inc: { rating: rating } }
      );

      if (updateResult.modifiedCount === 1) {
        res.send(`Updated rating for the video with ID ${videoId}`);
      } else {
        res.status(404).json({
          result: "failure",
          message: `Video with ID ${videoId} not found`,
        });
      }
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

process.on("SIGINT", async () => {
  try {
    await client.close();
    console.log("Connection to MongoDB closed");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});

run().catch(console.error);
