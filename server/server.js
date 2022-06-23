const express = require("express");
const cors = require("cors");
const videos = require("./routes/videos");


const app = express();


const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.use("/videos", videos);






app.listen(port, () => console.log(`Listening on port ${port}`));
