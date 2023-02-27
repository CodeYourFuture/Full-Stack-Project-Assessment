const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const localVideosFile = require("../exampleresponse.json");


app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with

// GET "/"
app.get("/", (request, response) => {
  // Delete this line after you've confirmed your server is running
  console.log(request.body);
  response.send({ express: "Your Backend Service is Running" });
});

app.post("/", (request, response) => {
    console.log(request.body);

  const body = request.body;

  if (body["title"] && body["url"]) {
    localVideosFile.push({ id: Math.floor(Math.random()*100000), title: body["title"], url: body["url"] });
    console.log(localVideosFile[localVideosFile.length-1]);
    response.send("Your POST was succesful!");

  } else { 
    response.send("Data missing");
  }
    // response.json("body");

});
