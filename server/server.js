const express = require("express");
const app = express();
app.use('/api/', require(".././exampleresponse.json"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
// GET "/" with data content check

app.get("/data", (req, res) => {
  // Delete this line after you've confirmed your server is running
  res.send({ express: "Your Backend Service is Running" });
  data.length ? res.status(200).json(data) : res.status(204).json(data);

});
app.listen(5000, function(){
  console.log("the listener will be listen to the port in 4000,");
});
