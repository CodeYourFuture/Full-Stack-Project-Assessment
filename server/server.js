const express = require("express");
const cors = require("cors");
const videos = require("./videosRouter");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// enable CORS
app.use(cors());
// add router
app.use("/",videos)