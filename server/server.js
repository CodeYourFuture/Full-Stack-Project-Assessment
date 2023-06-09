const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

const videoRouter = require("./routes/video");
app.use("/videos", videoRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`You are listening on port ${port}`));
