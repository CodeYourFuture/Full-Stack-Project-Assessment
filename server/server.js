const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config()
app.use(express.json())
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const data = require("./exampleresponse.json")
let videos = data;

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   res.send({ express: "Your Backend Service is Running" });
// });

app.get("/", (req, res) => {
  res.json(videos)
  
});

app.post("/", (req, res) => {

})





app.listen(port, () => console.log(`Listening on port ${port}`));