const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("./exampleresponse.json");

app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/videoList", (req, res) => {
  res.json(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
