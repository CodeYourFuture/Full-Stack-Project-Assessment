const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  console.log(req.body);
  res.send({ express: "Your Backend Service is Running" });
});

app.post("/", (request, response) => {
  // Delete this line after you've confirmed your server is running
    console.log(request.body);

  const body = request.body;

  if (request.body["title"] && request.body["url"]) {
    response.send("Your POST was succesful!");

  } else { 
    response.send("Data missing");
  }
    // response.json("body");

});
