const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const videos = require("./routes/videos");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
//
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/videos", videos);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));