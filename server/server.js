require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes"); 

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error.bind(console, "connection error: "));
mongoose.connection.once("open", () => {console.log("MongoDB Connection successful");});


app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));