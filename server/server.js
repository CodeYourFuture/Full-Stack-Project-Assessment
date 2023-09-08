const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const videoRoutes = require("./app/routes/videoRoutes");

app.use(express.json());
app.use(cors());

app.use("/", videoRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
