const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
let videoRoute = require("./Routes/video.route");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = require("./exampleresponse.json");

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   //res.send({ express: "Your Backend Service is Running" });
//   res.json(videos);
// });

app.use("/", videoRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
