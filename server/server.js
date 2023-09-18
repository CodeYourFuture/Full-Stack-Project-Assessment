const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", async (req, res) => {
  const { order } = req.query;
  try {
    if (order === "asc") {
      query += " ORDER BY rating ASC";
    } else {
      query += " ORDER BY rating DESC";
    }
    const res = await db.query(query);
    let orderedVideos = res.rows;
    res.json(orderedVideos);
  } catch (error) {
    res.status(500).json({
      result: "failure",
      message: "Error retrieving videos",
    });
  }
});

// GET "/{id}"
app.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(404).json({
      result: "failure",
      message: "Video not found",
    });
    return;
  }

  try {
    const result = await db.query("SELECT * FROM videos WHERE id = $1", [id]);
    const video = result.rows[0];

    if (!video) {
      res.status(404).json({
        result: "failure",
        message: "Video not found",
      });
      return;
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({
      result: "failure",
      message: "Error retrieving video",
    });
  }
});

app.post("/", async (req, res) => {
  // adding the checks here after suggested by Jonathan so front-end can be cleaner
  const { title, url } = req.body;

  if (
    !title ||
    !url ||
    !url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S+)?$/)
  ) {
    res.send({
      result: "failure",
      message: "Video could not be saved",
    });
    return;
  }
  let newId = null;
  await db
    .query(
      `INSERT INTO videos (title,url,rating)
  VALUES ($1,$2,$3) RETURNING id`, //returning id of last element inserted
      [title, url, 0]
    )
    .then((id) => {
      newId = id;
      console.log(newId);
    });
  res.send({
    id: newId,
  });
});

// DELETE "/{id}"
app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(404).json({
      result: "failure",
      message: "Invalid video ID",
    });
    return;
  }

  try {
    const result = await db.query(
      "DELETE FROM videos WHERE id = $1 RETURNING id",
      [id]
    );
    const deletedId = result.rows[0]?.id;

    if (!deletedId) {
      res.status(404).json({
        result: "failure",
        message: "Video not found",
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      result: "failure",
      message: "Error deleting video",
    });
  }
});
