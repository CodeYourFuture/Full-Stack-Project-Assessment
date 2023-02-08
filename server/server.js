const express = require("express");
const app = express();
app.use(express.json());
const { Pool } = require("pg");
const cors = require("cors");
const { rows } = require("pg/lib/defaults");
const dotenv = require("dotenv");
const path = require("path");


app.use(express.static(path.resolve(__dirname, "../client/build")));
dotenv.config();

const pool = new Pool({
  // user: "test_user",
  // database: "full_stack_project_assisment_testdb",
  // password: "eFzzVWRX5fG2FMspFWFlkPEECsgc4IWV",
  // host: "dpg-cfd5271gp3jl4ddrqfrg-a.oregon-postgres.render.com",
  // port: 5432,

   connectionString: process.env.DATABASE_URL,
   connectionTimeoutMillis: 5000,
   ssl: {
     rejectUnauthorized: false,
   }
});




app.use(
  cors({
    accessControlAllowOrigin: "*",
  })
);

app.get("/videos", (req, res) => {
  const order = req.query.order;
  
  let query = "SELECT * FROM videos";
  if (order === "asc") {
    query = query + " ORDER BY  rating "
  } else if (order === "desc") {
    
    query = query + " ORDER BY  rating desc ";
};
  pool
    .query(query)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      throw error;
    });
});
app.post("/videos", (req, res) => {
  const { title, url, rating } = req.body;
  const query = "INSERT INTO videos (title, url, rating) VALUES ($1, $2, $3)";
  const values = [title, url, rating];
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "Video created!" });
    })
    .catch((error) => {
      throw error;
    });
});
//changing the rating of a video
app.put("/videos/:id", (req, res) => {
  let id = req.params.id;
  const { rating } = req.body;
  const query = "UPDATE videos SET rating = $1 WHERE id = $2";
  const values = [rating, id];
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "Video updated!" });
    })
    .catch((error) => {
      throw error;
    });
});
//deleting a video
app.delete("/videos/:id", (req, res) => {
  let id = req.params.id;
  const query = "DELETE FROM videos WHERE id = $1";
  const values = [id];
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "Video deleted!" });
    })
    .catch((error) => {
      throw error;
    });
});

const port= process.env.PORT || 3011;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});



