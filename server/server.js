const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
