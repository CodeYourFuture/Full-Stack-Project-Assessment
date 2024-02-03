const { Pool } = require("pg");

require("dotenv").config();

// Create a PostgreSQL pool
const db = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

let videos = [];

// Function to create the "videos" table if it doesn't exist
const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      url TEXT NOT NULL,
      uploadDate TIMESTAMP NOT NULL,
      rating INT NOT NULL
    )`;

  try {
    const result = await db.query(createTableQuery);
    console.log("Table 'videos' created or already exists.");
    return result;
  } catch (err) {
    console.error("Error creating the 'videos' table:", err);
    throw err;
  }
};

// Function to populate the table from videos
const populateTable = async () => {
  videos.forEach(async (video) => {
    try {
      await db.query(
        "INSERT INTO videos (title, url, uploaddate, rating) VALUES ($1, $2, $3, $4)",
        [video.title, video.url, new Date(), video.rating]
      );
    } catch (error) {
      console.error("Error inserting video into the database:", error);
      throw error;
    }
  });

  console.log("Populated 'videos' table from exampleresponse.json");
};

module.exports = {
  createTable,
  populateTable,
};
