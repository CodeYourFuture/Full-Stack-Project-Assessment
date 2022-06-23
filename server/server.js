const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const port = 8080;
//evn file or dotenv file is a simple text configuration file
//for controlling your Application environmentconstans.
//between local staging and production environments the majority of your Application will not change.

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
//let videos = [];

// GET "/"
app.get("/task", (req, res) => {
  const { n } = req.query;
  // Delete this line after you've confirmed your server is running
  res.json(`You hit a video :, ${n}`);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
