const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// QUERIES
const getAllVideosQuery = `SELECT * FROM videos ORDER BY rating`;
const getVideoByIdQuery = `SELECT * FROM videos WHERE id = $1`;
const addNewVideoQuery = `INSERT INTO videos (id, title, url) VALUES ($1, $2, $3)`;
const updateVideoRatingQuery = `UPDATE videos SET rating = $1 WHERE id = $2`;
const deleteVideoByIdQuery = `DELETE FROM videos WHERE id = $1`;
const getVideoByUrlQuery = `SELECT * FROM videos WHERE url = $1`;

// get all videos
function getAllVideos(sortOrder) {
  return pool.query(`${getAllVideosQuery} ${sortOrder}`);
}

// search/find a video from list by video id
function getVideoById(vId) {
  return pool.query(getVideoByIdQuery, [vId]);
}

//
async function getVideoByUrl(vUrl) {
  return pool.query(getVideoByUrlQuery, [vUrl]);
}

// add video to list
function addNewVideo({ id, title, url, datePosted }) {
  // const
  return pool.query(addNewVideoQuery, [id, title, url]);
}

// update user rating of a video
function updateVideoRating(vId, vRating) {
  return pool.query(updateVideoRatingQuery, [vRating, vId]);
}

// remove video from list
function deleteVideoById(vId) {
  return pool.query(deleteVideoByIdQuery, [vId]);
}

module.exports = {
  getAllVideos,
  addNewVideo,
  getVideoById,
  updateVideoRating,
  deleteVideoById,
  getVideoByUrl,
};
