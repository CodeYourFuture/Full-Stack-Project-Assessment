const { response } = require("express");
const cors = require("cors");

const express = require("express");
const { Pool } = require("pg");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const fs = require("fs/promises");
const path = require("path");
app.use(express.static(path.join(__dirname, "../client/build")));
// Configure the database connection
const pool = new Pool({
  user: "mele",
  host: "localhost",
  database: "cyf_hotels",
  password: "Meleubuntu12",
  port: 5432,
});
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error", err));
// // //GET "/videos"
app.get("/videos", async (request, response) => {
  try {
    const updatedData = await pool.query("SELECT * FROM video");

    response.json(updatedData.rows);
  } catch (error) {
    console.error("Error fetching updated data:", error);
    response.status(500).send("Internal server error");
  }
});

app.post("/videos", async (request, response) => {
  const formData = request.body;
  try {
    console.log("Received form data:", formData);
    await pool.query(
      "INSERT INTO video (title, url, rating) VALUES ($1, $2, $3)",
      [formData.title, formData.url, formData.rating]
    );
    console.log("Data inserted successfully");
    response.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

app.get("/videos/:id", async (request, response) => {
  try {
    let id = parseInt(request.params.id);
    console.log(id);
    const query = "SELECT * FROM video WHERE id = $1}";
    const result = await pool.query(query, [id]);

    response.json(result.rows);
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    response.status(500).send("Internal server error");
  }
});
app.delete("/videos/:id", async (request, response) => {
  let id = parseInt(request.params.id);

  try {
    const query = "DELETE FROM video WHERE id = $1";
    await pool.query(query, [id]);

    response.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    response.status(500).send("Internal server error");
  }
});
//Post like
app.post("/videos/:id/like", async (request, response) => {
  const videoId = parseInt(request.params.id);

  try {
    await pool.query("UPDATE video SET rating = rating + 1 WHERE id = $1", [
      videoId,
    ]);
    response.json({ message: "Vote updated successfully." });
  } catch (error) {
    console.error("Error updating vote:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});
//post dislike
app.post("/videos/:id/dislike", async (request, response) => {
  const videoId = parseInt(request.params.id);

  try {
    const result = await pool.query(
      "UPDATE video SET rating = GREATEST(rating - 1, 0) WHERE id = $1 RETURNING *",
      [videoId]
    );

    if (result.rowCount === 0) {
      response.status(404).json({ error: "Card not found" });
    } else {
      response.json({ message: "Vote updated successfully." });
    }
  } catch (error) {
    console.error("Error updating vote:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//listening port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));
