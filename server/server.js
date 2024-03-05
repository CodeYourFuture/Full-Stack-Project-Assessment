require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  // user: process.env.DB_USERNAME,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
// console.log(db);

app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//$ npm run dev

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any domain
//   next();
// });
app.get("/", (req, res) => {
  console.log(process.env.DB_PASSWORD);

  res.send({ express: "Your Backend Service is Running" });
});

app.get("/video", async (req, res) => {
  try {
    const order = req.query.order === "asc" ? "ASC" : "DESC";
    const query = `SELECT * FROM videos ORDER BY rating ${order}`;
    const request = await db.query(query);
    const response = request.rows;
    // console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/video", async (req, res) => {
  const { title, url } = req.body;
  // console.log("post video req.body", req.body);
  const id = url.split("embed/")[1];
  // console.log("post video id", id);
  if (!title && !url) {
    return res.status(404).json({ error: "One or several filds wasn't filed" });
  }

  try {
    const query = `
    INSERT INTO videos (title, url, id)
    VALUES ($1, $2, $3)
    `;
    const request = await db.query(query, [title, url, id]);
    const result = request.rows;
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/video/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const query = "DELETE FROM videos WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rowCount === 1) {
      return res.status(201).json({ success: true });
    } else {
      return res.status(404).json({
        error: {
          result: "failure",
          message: "Video could not be deleted",
        },
      });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the record" });
  }
});

app.patch("/video/:id", async (req, res) => {
  const id = req.params.id;
  const rating = parseInt(req.body.rating);

  try {
    const query = `
    UPDATE videos
    SET rating = $1
    WHERE id = $2;
    `;

    const request = await db.query(query, [rating, id]);
    const result = request.rows;
    // console.log(result);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App is listening on ${process.env.SERVER_PORT}`);
});

module.exports = app;
// npx browserslist@latest --update-db
