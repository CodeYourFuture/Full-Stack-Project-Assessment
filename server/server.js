const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/movies", movies);

const port = process.env.PORT || 5000;
server = app.listen(port, () => console.log(`Server running on port ${port}`));

router.get("/", (req, res) => {});
