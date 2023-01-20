const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
