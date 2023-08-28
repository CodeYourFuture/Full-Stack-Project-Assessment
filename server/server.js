require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// testing .env file
console.log(process.env.secret);
console.log(typeof process.env.PORT);
console.log(typeof port);

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
});

app.post("/", (req, res) => {
  res.send("success You have made a post request");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
