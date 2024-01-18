const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const videoRouter = require("./videoRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use("/api", videoRouter);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
