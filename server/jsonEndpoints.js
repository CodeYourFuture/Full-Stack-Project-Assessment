const express = require("express");
const fs = require("fs");
const router = express.Router();

const jsonFilePath = "./exampleResponse.json";
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

router.get("/", async (req, res) => {
  try {
    const jsonVideos = [...jsonData];
    console.log("Connection successful");
    res.json(jsonVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos from jsonData" });
  }
});

module.exports = router;
