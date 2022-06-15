const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

app.use("/videos", require("./routers/video"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
