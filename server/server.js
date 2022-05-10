//const { urlencoded } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { Client } = require("pg");
app.use(express.json()); // before our routes definition
app.use(express.urlencoded({ extended: false }));
//app.use(routre);
const bodyParser = require("body-parser");
const datas = require("./exampleresponse.json");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "videos",
  port: 5432,
});
app.get("/thevideos", (req, res) => {

  client
    .query("SELECT * FROM thevideos")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(404).send("hello").json(error);
    });
});
app.post("/thevideos", (req, res) => {
  let idOne = req.body.id;
  let titleOne = req.body.title;
  let urlOne = req.body.url;
  let ratingOne = req.body.rating;

  const query =
    "INSERT INTO videos(id, title, url, rating)VALUES($7, $the best movies, $https://youtu.be/xVYa20DCUv0$, $34993)";
  client
    .query(query, [idOne, titleOne, urlOne, ratingOne])
    .then(() => res.send("result.rows"))
    .catch((error) => console.error(error));
  res.status(404).json({ success: " true" });
});
// read data on server

app.get("/datas", (req, res) => {
  res.status(200);
  datas.length ? res.status(200).json(datas) : res.status(204).json(datas);
});

//create data to the body
app.post("/datas", (req, res) => {
  console.log(req.body);
  let videos = req.body;

  datas.push(videos);
  return res.status(201).json({ title: "viddeos for learn code " });
});
// read data by id

app.get("/datas/:id", (req, res) => {
  console.log(req.params.id);
  let myId = req.params.id;
  res.send('hi get id with ${myId}');
});

//delete data spicifice id
app.delete("/datas/:id", (req, res) => {
  const { id } = req.params;
  const deleted = datas.find((idOne) => idOne.id === id);
  if (deleted) {
    console.log(deleted);
    datas = datas.filter((lesson) => lesson.id !== id);
    res.status(200).json({ success: "{ }" });
  } else {
    res.status(404).json({ message: "video  be deleted", result: "fauilur" });
  }
});
// function  routre(){
//   console.log("hello world");
// }
// const datasRouter = require('./routes/datas.js');
// app.use("/datas", datasRouter);

app.listen(4000, function () {
  console.log("the listener will be listen to the port in 4000,");
});
