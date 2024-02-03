const express = require("express");
const cors = require("cors");
const jsonEndpoints = require("./jsonEndpoints");
const { testConnection, createTable, populateTable, hasRecords, db } = require("./databaseSetup");
const dbEndpoints = require("./dbEndpoints");

const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();

app.use(express.json());
app.use(cors());


testConnection()
  .then(createTable)
  .then(populateTable)
  .catch((error) => {
    console.error("Error setting up database:", error);
  });
  
// app.use("/", jsonEndpoints);
app.use("/", dbEndpoints(db));

const server = app.listen(port, () => {
const { address, port } = server.address();
const host = address === '::' ? 'localhost' : address;
console.log(`Server is running at http://${host}:${port}`);
});
