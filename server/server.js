const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const supabase = require("./DBsupabase");
const app = express();

app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5001;

app.use(cors());

// Store and retrieve your videos from here

app.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from("allinone").select("*");

    if (error) {
      console.error('Supabase error:', error.message);
      throw error;
    }
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data: allData, error: allError } = await supabase
      .from("allinone")
      .select("*");

    if (allError) {
      console.error("Supabase error:", allError.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const video = allData.find((record) => record.id == id);

    if (!video) {
      res.status(404).json(`There is no video with id ${id}`);
    } else {
      res.status(200).json(video);
    }
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
