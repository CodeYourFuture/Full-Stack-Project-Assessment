const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);

// QUERIES
const getAllVideosQuery = `SELECT * FROM videos ORDER BY rating`;
const getVideoByIdQuery = `SELECT * FROM videos WHERE id = $1`;
const addNewVideoQuery = `INSERT INTO videos (id, title, url) VALUES ($1, $2, $3)`;
const updateVideoRatingQuery = `UPDATE videos SET rating = $1 WHERE id = $2`;
const deleteVideoByIdQuery = `DELETE FROM videos WHERE id = $1`;
const getVideoByUrlQuery = `SELECT * FROM videos WHERE url = $1`;

// get all videos
function getAllVideos(sortOrder) {
  return client.query(`${getAllVideosQuery} ${sortOrder}`);
}

// search/find a video from list by video id
function getVideoById(vId) {
  return client.query(getVideoByIdQuery, [vId]);
}

// 
async function getVideoByUrl(vUrl) {
  return client.query(getVideoByUrlQuery,[vUrl]);
}

// add video to list
function addNewVideo({id,title,url,datePosted}) {
  // const 
  return client.query(addNewVideoQuery, [id,title,url]);
}

// update user rating of a video
function updateVideoRating(vId, vRating) {
  return client.query(updateVideoRatingQuery, [vRating, vId]);
}

// remove video from list
function deleteVideoById(vId) {
  return client.query(deleteVideoByIdQuery, [vId]);
}

module.exports = {
  getAllVideos,
  addNewVideo,
  getVideoById,
  updateVideoRating,
  deleteVideoById,
  getVideoByUrl
};
