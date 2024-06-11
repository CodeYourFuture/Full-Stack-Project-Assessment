import { Router } from "express";
import db from "./db.js";
const router = Router();

//Get all videos
router.get("/videos", async (_, res) => {
	console.log("api videos");
	db.query("SELECT * FROM videos")
		.then((result) => {
			//console.log(result);
			res.status(200).json({ videos: result.rows });
		})
		.catch((error) => {
			console.log(error);
		});
});

// Delete a specific video by ID
router.delete("/videos/:id", async (req, res) => {
  const { id } = req.params;

  db.query(`SELECT * FROM videos WHERE id = ${id}`)
  .then((result) => {
			//console.log(result);
			res.status(204).send();
		})
		.catch((error) => {
			console.log("Error deleting video:", error);
		});

    if (checkResult.rows.length === 0) {
      // If no video found with the given ID, respond with 404
      return res.status(404).json({ error: "Video not found" });
    }

    // Delete the video
    await db.query("DELETE FROM videos WHERE id = $1", [id]);

    // Respond with 204 No Content to indicate successful deletion
    
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
