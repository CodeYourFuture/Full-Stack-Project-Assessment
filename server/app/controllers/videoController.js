
const db = require('../config/db'); 

module.exports = {
  getVideos: async (req, res) => {
    const { order } = req.query;

    try {
      let queryText = 'SELECT * FROM videos';
      if (order === "asc") {
        queryText += ' ORDER BY rating ASC';
      } else {
        queryText += ' ORDER BY rating DESC'; 
      }

      const result = await db.query(queryText);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createVideo: async (req, res) => {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        result: "failure",
        message: "Both title and url must be provided",
      });
    }

    try {
      const queryText = 'INSERT INTO videos (title, url) VALUES ($1, $2) RETURNING *';
      const values = [title, url];

      const result = await db.query(queryText, values);

      res.status(201).json(result.rows[0]); 
    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getVideoById: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const queryText = 'SELECT * FROM videos WHERE id = $1';
      const values = [id];

      const result = await db.query(queryText, values);

      if (result.rows.length === 0) {
        return res.status(404).json({
          result: "failure",
          message: "Video not found",
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching video by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteVideo: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const queryText = 'DELETE FROM videos WHERE id = $1';
      const values = [id];

      const result = await db.query(queryText, values);

      if (result.rowCount === 0) {
        return res.status(404).json({
          result: "failure",
          message: "Video not found",
        });
      }

      res.json({});
    } catch (error) {
      console.error('Error deleting video by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
