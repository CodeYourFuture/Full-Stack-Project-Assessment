const express = require("express");
const cors = require("cors");
const jsonEndpoints = require("./jsonEndpoints");
// const { createTable, populateTable } = require("./databaseSetup");
// const databaseEndpoints = require("./dbEndpoints");

const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/", jsonEndpoints);

app.listen(port, () => console.log(`Listening on port ${port}`));
