# Full Stack Project Assessment

This is a Full Stack Project Assessment that involves building a video management application. The application allows users to view a list of videos, add new videos, and delete existing videos.
![Video Management Application](./extra/Screenshot%202023-05-24%20at%2017.20.37.png)

## Technologies Used

The project utilizes the following technologies:

### Frontend

- React: A JavaScript library for building user interfaces.
- HTML: The standard markup language for creating web pages.
- CSS: A style sheet language used for describing the presentation of a document written in HTML.

### Backend

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express: A web application framework for Node.js.
- PostgreSQL: A powerful, open-source object-relational database system.

## Implementation

The project consists of two main components: the frontend and the backend.

### Frontend

The frontend of the application is built using React. It allows users to view a list of videos, add new videos, and delete existing videos.

Key files and folders in the frontend project:

- `src/components`: Contains React components that make up the different parts of the application, such as the video list and video form components.
- `src/services/api.js`: Provides functions for interacting with the backend API to fetch videos, add a new video, and delete a video.

To run the frontend locally, follow these steps:

1. Navigate to the `frontend` directory: `cd frontend`.
2. Install the dependencies: `npm install`.
3. Start the development server: `npm start`.
4. Open your web browser and visit `http://localhost:3000` to view the application.

### Backend

The backend of the application is built using Node.js and Express. It provides API endpoints for fetching videos, adding a new video, and deleting a video. It also connects to a PostgreSQL database to store and retrieve videos.

Key files and folders in the backend project:

- `index.js`: The main entry point of the backend application.
- `routes/videos.js`: Defines the API routes for videos, including GET, POST, and DELETE endpoints.
- `db.js`: Configures the connection to the PostgreSQL database.

To run the backend locally, follow these steps:

1. Navigate to the `backend` directory: `cd backend`.
2. Install the dependencies: `npm install`.
3. Set up the PostgreSQL database and update the `.env` file with the appropriate credentials.
4. Start the backend server: `npm start`.
5. The server will be running at `http://localhost:5001`.

## Deployment

The application can be deployed to a hosting platform of your choice. Here are the general steps to deploy the frontend and backend:

1. Frontend:

   - Build the production-ready version of the frontend: `npm run build`.
   - Deploy the generated build files to a static file hosting service like Netlify, Vercel, or AWS S3.

2. Backend:
   - Set up a PostgreSQL database on a hosting platform or cloud provider.
   - Configure the database connection in the `.env` file with the appropriate credentials.
   - Deploy the backend code to a hosting platform like Heroku, AWS EC2, or DigitalOcean.

Make sure to update the frontend API endpoint in the frontend code (`src/services/api.js`) to match the deployed backend URL.
