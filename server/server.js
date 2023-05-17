// Importing required packages and modules
const express = require("express"); // Web framework for Node.js
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing
const { Pool } = require("pg"); // PostgreSQL client library
const dotenv = require("dotenv"); // Module for loading environment variables from a .env file
dotenv.config();

const app = express(); // Creating an instance of the express application
const port = process.env.PORT || 8080; // Setting the port to either the one specified in the environment variable or 8080 as the default

// Database configuration
const pool = new Pool({
  connectionString: process.env.DB_URL, // Connection URL for connecting to the PostgreSQL database
  ssl: {
    rejectUnauthorized: false, // Disabling SSL/TLS certificate verification (for development purposes only)
  },
});

app.use(cors()); // Allowing Cross-Origin requests
app.use(express.json()); // Parsing JSON request bodies

app.listen(port, () => console.log(`Listening on port ${port}`)); // Starting the server and logging the port number


// Handling GET request for the root path "/"
app.get("/", (req, res) => {
  res.send({ express: "Your Backend Service is Running" }); // Sending a JSON response
});

// Handling GET request for the "/videos" path
app.get("/videos", async (req, res) => {
  try {
    const orderParam = req.query.order; // Extracting the value of the "order" query parameter from the request URL
    let orderBy = "rating DESC"; // Default order is descending (desc)

    if (orderParam === "asc") {
      orderBy = "rating ASC"; // If the "order" query parameter is "asc", change the order to ascending (asc)
    }

    const query = `SELECT * FROM videos ORDER BY ${orderBy}`; // Constructing the SQL query with the specified order
    const result = await pool.query(query); // Executing the query using the database connection pool
    const orderedVideos = result.rows; // Extracting the rows from the query result

    res.json(orderedVideos); // Sending the ordered videos as a JSON response
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos" }); // Sending an error response if an exception occurs
  }
});

// Handling POST request for the "/videos" path
app.post("/videos", async (req, res) => {
  try {
    const { title, url } = req.body; // Extracting the "title" and "url" properties from the request body
    const rating = 0; // Default rating is 0

    const currentDate = new Date().toLocaleDateString("en-US", {
      timeZone: process.env.TIMEZONE, // Getting the current date in the specified timezone
    });

    const query =
      "INSERT INTO videos (title, url, rating, date) VALUES ($1, $2, $3, $4) RETURNING *"; // Constructing the SQL query with parameter placeholders
    const values = [title, url, rating, currentDate]; // Binding the parameter values to be inserted into the query
    const result = await pool.query(query, values); // Executing the query with the provided values
    const newVideo = result.rows[0]; // Extracting the newly created video from the query result

    res.status(201).json(newVideo); // Sending a JSON response with the newly created video and setting the status code to 201 (Created)
  } catch (error) {
    console.error("Error creating video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the video" }); // Sending an error response if an exception occurs
  }
});

// Handling DELETE request for the "/videos/:id" path
app.delete("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id; // Extracting the value of the "id" path parameter from the request URL

    const query = "DELETE FROM videos WHERE id = $1 RETURNING *"; // Constructing the SQL query with parameter placeholders
    const values = [videoId]; // Binding the parameter value to be used in the query
    const result = await pool.query(query, values); // Executing the query with the provided value
    const deletedVideo = result.rows[0]; // Extracting the deleted video from the query result

    if (deletedVideo) {
      res.json(deletedVideo); // Sending the deleted video as a JSON response
    } else {
      res.status(404).json({ message: "Video not found" }); // Sending a 404 (Not Found) response if the video was not found
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the video" }); // Sending an error response if an exception occurs
  }
});

// Handling PUT request for the "/videos/:id/rating" path
app.put("/videos/:id/rating", async (req, res) => {
  try {
    const videoId = req.params.id; // Extracting the value of the "id" path parameter from the request URL
    const { rating } = req.body; // Extracting the "rating" property from the request body

    const query = "UPDATE videos SET rating = $1 WHERE id = $2"; // Constructing the SQL query with parameter placeholders
    const values = [rating, videoId]; // Binding the parameter values to be used in the query
    await pool.query(query, values); // Executing the query with the provided values

    res.json({ message: "Rating updated successfully" }); // Sending a JSON response with a success message
  } catch (error) {
    console.error("Error updating rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the rating" }); // Sending an error response if an exception occurs
  }
});
