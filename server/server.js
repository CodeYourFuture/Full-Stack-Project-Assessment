//const { urlencoded } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // before our routes definition
app.use(express.urlencoded({ extended : false }));
const bodyParser = require("body-parser");
const datas = require( './exampleresponse.json');

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = [];
// GET "/"
// GET "/" with data content che

app.get("/datas", (req, res) => {
  //res.setHeader("Access-Contorl-Allow-Origin", "http://localhost:3000");
  res.status(200);
  datas.length ? res.status(200).json(datas) : res.status(204).json(datas);

});
app.post("/datas", (req, res) => {
  console.log(req.body);
  let videos = req.body;
  datas.push(videos);
return res.status(201).json( {title: "viddeos for learn code "});
});
app.get("/datas/:id", (req, res) => {
  console.log(req.params.id);
  let myId = req.params.id;
  res.status(200).send(myId);

});
app.delete("/datas/:id", (req, res) => {
 const { id } = req.params.id;
 const deleted = datas.find(idOne => idOne.id === id);
if(deleted){
  console.log(deleted);
  datas = datas.filter(lesson => lesson.id !== id);
  res.status(200).json({success: "{ }"});

}else{
  res.status(404).json({message: "video can not be deleted", 
  result: "fauilur"});
}
});

app.listen(4000, function(){
  console.log("the listener will be listen to the port in 4000,");
});
