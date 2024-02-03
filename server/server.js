const express = require("express");
const cors = require("cors");
const jsonEndpoints = require("./jsonEndpoints");
const { testConnection, createTable, populateTable } = require("./databaseSetup");
// const databaseEndpoints = require("./dbEndpoints");

const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/", jsonEndpoints);

testConnection()
  .then(createTable)
  .then(populateTable)
  .catch((error) => {
    console.error("Error setting up database:", error);
  });

const server = app.listen(port, () => {
const { address, port } = server.address();
const host = address === '::' ? 'localhost' : address; // Convert IPv6 to IPv4 if necessary
console.log(`Server is running at http://${host}:${port}`);
});
