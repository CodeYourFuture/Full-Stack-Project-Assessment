const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
// let videos = require("../data/videos");

async function getUsers() {
  const { data, error } = await supabase.from("fav_video").select("*");

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
  return data;
}

router.get("/", async (req, res) => {
  const data = await getUsers();
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { data, error } = await supabase
    .from("fav_video")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({
      result: "Failure",
      message: "Server error",
    });
  }

  if (!data) {
    return res.status(404).json({
      result: "Failure",
      message: "Video not found",
    });
  }

  res.json(data);
});

// router.delete("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const index = videos.findIndex((v) => v.id === id);
//   console.log(index);
//   if (index === -1) {
//     return res.status(404).json({
//       result: "Failure",
//       message: "Video not found",
//     });
//   }
//   const deleted = videos.splice(index, 1);
//   res.json({ message: `${id} has been deleted` });
// });

module.exports = router;
