# Video Recommendation Backend Server
This repository contains a backend server built with Node.js and Express. The server provides an API for managing videos, including fetching, creating, updating, and deleting videos. The video data is stored in a PostgreSQL database.

---

## Prerequisites
Before running the server, ensure that you have the following installed:

- Node.js (v14 or later)
- PostgreSQL (v10 or later)

---

## Getting Started
1. Clone the repository to your local machine:
```bash
    https://github.com/ShayanMahnam/Full-Stack-Project-Assessment.git
```
2. Navigate to the project directory:
```bash
    cd server
```
3. Install the dependencies:
```bash
    npm install
```
4. Set up the PostgreSQL database:

Create a new PostgreSQL database.
Update the .env file with the appropriate database connection URL (DB_URL) and other configuration values.<br>
example:
```bash
    DB_URL=postgresql://username:password@localhost:5432/your-database-name
```
5. Start the server:
```bash
    npm start
```
6. The server will start running on http://localhost:8080. You should see the message "Listening on port 8080" in the console.

---

## API Endpoints
- GET /: Retrieves a simple message to verify that the backend service is running.
- GET /videos: Retrieves a list of videos in the database, ordered by rating (descending by default, ascending if order=asc query parameter is provided).
- POST /videos: Creates a new video with the provided title and url in the request body. The rating is set to 0 by default.
- DELETE /videos/:id: Deletes the video with the specified id.
- PUT /videos/:id/rating: Updates the rating of the video with the specified id with the provided rating value in the request body.

Note: Replace :id with the actual video ID when making requests to the /videos/:id and /videos/:id/rating endpoints.

---

# Database Setup

The backend server uses a PostgreSQL database to store video data. You'll need to set up the database and create the necessary table before running the server.

1. Install PostgreSQL: If you haven't already, make sure PostgreSQL is installed on your system. You can download it from the PostgreSQL website.

2. Create a Database: Use the PostgreSQL command line or a graphical tool like pgAdmin to create a new database for the server. You can choose any name for your database.

3. Update .env File: Open the .env file in your project directory and set the DB_URL variable to the connection URL of your PostgreSQL database. Make sure to replace <your-database-name> with the actual name of your database. Here's an example:
```bash
    DB_URL=postgresql://username:password@localhost:5432/your-database-name
```
4. Table Schema: The server expects a table named videos in the database. You can create the table using the following SQL command:
```sql
    CREATE TABLE videos (
      id SERIAL PRIMARY KEY,
      title TEXT,
      url TEXT,
      rating INTEGER,
      date DATE
    );
```

The videos table has the following columns:

- id: A unique identifier for each video (automatically generated).
- title: The title of the video.
- url: The URL of the video.
- rating: The rating of the video.
- date: The date when the video was created.

Feel free to modify the table schema according to your specific requirements.

---

## Example Table Data
Here's an example of how the videos table may look with some sample data:

| id | title         | url                             | rating | date       |
|----|---------------|---------------------------------|--------|------------|
| 1  | Video 1       | https://example.com/video1      | 4      | 2023-05-01 |
| 2  | Video 2       | https://example.com/video2      | 5      | 2023-05-02 |
| 3  | Video 3       | https://example.com/video3      | 3      | 2023-05-03 |
| 4  | Video 4       | https://example.com/video4      | 2      | 2023-05-04 |
| 5  | Video 5       | https://example.com/video5      | 1      | 2023-05-05 |

This is just an example to illustrate the structure of the table and the kind of data it can store. The actual data in your table may differ.

Make sure to populate the videos table with your own data as needed.

Once you have set up the database and created the videos table, you should be able to run the backend server and interact with the video management API.

Feel free to modify the table structure or the sample data according to your specific requirements.

---

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.
