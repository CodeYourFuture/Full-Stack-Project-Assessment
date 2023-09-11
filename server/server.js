const PORT = 4500;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const fs = require("fs");
// const fs = require("fs").promises;

app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

function getConvertedDataFromBookingsJSON() {
  const rawData = fs.readFileSync("./videos.json");
  const objData = JSON.parse(rawData);
  return objData;
}

function writeUpdateDataToJsonFile(data) {
  const jsonFile = "./videos.json";
  const newData = JSON.stringify(data);
  fs.writeFile(jsonFile, newData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File written successfully.");
    }
  });
}

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any domain
//   next();
// });

app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" });
});

app.get("/video", (req, res) => {
  return res.status(200).send(getConvertedDataFromBookingsJSON());
});

app.post("/video", (req, res) => {
  const { title, url } = req.body;
  if (!title && !url) {
    res.status(400).json({ error: "One or several filds wasn't filed" });
  }

  const objData = getConvertedDataFromBookingsJSON();
  objData.push({
    ///////////////////////////////////////////////
    id: req.body.url.split("=")[1],
    ///////////////////////////////////////////////
    title: req.body.title,
    url: req.body.url,
    rating: req.body.rating,
  });
  writeUpdateDataToJsonFile(objData);
  return res.status(201).send(objData);
});

const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT);
});
