const express = require("express");
const app = express();
const port = 5000;
const videosData = require("./exampleresponse.json");

app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videos", (req, res) => {
  res.send(videosData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
