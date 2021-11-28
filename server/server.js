const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Import local json data.
const data = require(".././exampleresponse.json");


// GET "/" with data content check
app.get("/", (req, res) => {
  data.length ? res.status(200).json(data) : res.status(204).json(data);
});







app.listen(port, () => console.log(`Listening on port ${port}`));
