const express = require('express');
const app = express();
const { Pool } = require('pg'); // Import the 'pg' module for PostgreSQL

app.use(express.json()); // Enable JSON parsing in request bodies

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false // For local connections without SSL (optional)
  }
});

// Endpoint to list items (GET)
app.get('/items', async (req, res) => {
  try {
    const client = await pool.connect(); 
    const result = await client.query('SELECT * FROM items');
    const items = result.rows; 
    client.release(); // Release the client back to the pool
    res.json(items); // Send the items as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching items' }); // Send error response
  }
});

// Endpoint to create a new item (POST)
app.post('/items', async (req, res) => {
  try {
    const { name, description } = req.body; // Extract name and description from request body
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description] 
    );
    const newItem = result.rows[0]; 
    client.release(); 
    res.status(201).json(newItem); // Send the newly created item as JSON with 201 status
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating item' });
  }
});

exports.handler = app; // Export the Express app as the handler for Netlify Functions
