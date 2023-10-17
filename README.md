# Full Stack Video Management Application

![Video Management Application](./extra/Screenshot%202023-05-24%20at%2017.20.37.png)

<div align="center">

  <h3 align="center">Video Management Application</h3>

  <p align="center">
    An awesome video management application to organize and view your video collection!
    <br />
    <a href="https://github.com/your_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cyf-momahboobian-full-stack-project.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/momahboobian/Video-recommendation/issues">Report Bug</a>
    ·
    <a href="https://github.com/momahboobian/Video-recommendation/issues">Request Feature</a>
  </p>
</div>

## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## About The Project

[Video Management Application Screenshot](https://cyf-momahboobian-full-stack-project.netlify.app/)

Welcome to the Video Management Application! This application helps you manage your video collection. We created this app because we believe your time should be spent enjoying your videos, not dealing with organizational hassles.

Here's why our app is fantastic:

- Easily organize and access your video collection.
- Simple, user-friendly interface.
- Free and open source.

We understand that every project is unique, and this README template might not cover all your specific needs. If you have suggestions or contributions, please fork this repository and submit a pull request.

Use the provided `BLANK_README.md` to get started with your project documentation.

### Built With

List the major technologies/frameworks used in your project:

- [React](https://reactjs.org)
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)

## Getting Started

This section provides instructions on how to set up the project locally.

### Prerequisites

List the prerequisites needed to use your software:

- Node.js
  ```sh
  npm install npm@latest -g
  ```

# Full Stack Video Management Application

A Full Stack Video Management Application built to allow users to view a list of videos, add new videos, and delete existing videos.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **HTML**: The standard markup language for creating web pages.
- **CSS**: A style sheet language used for describing the presentation of an HTML document.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A web application framework for Node.js.
- **PostgreSQL**: A powerful, open-source object-relational database system.

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
Installation
Follow these simple steps to get your local environment set up:

Obtain a free API Key from https://example.com.
Clone the repository:
sh
Copy code
git clone https://github.com/your_username/repo_name.git
Install NPM packages:
sh
Copy code
npm install
Enter your API key in the config.js file:
js
Copy code
const API_KEY = "ENTER YOUR API";
Usage
Use this space to showcase examples of how to use your project effectively. Feel free to include screenshots, code snippets, and additional demos to demonstrate its functionality. You may also link to the project's documentation for more information.

For more examples, please refer to the Documentation

Roadmap
Add Changelog
Add back to top links
Add Additional Templates with Examples
Include a "components" document for easy section copying and pasting in the README
Implement multi-language support, including Chinese and Spanish
To see the full list of proposed features and known issues, visit the open issues on the project's GitHub repository.

Contributing
Contributions are essential to the open-source community, making it a fantastic place to learn, inspire, and create. We greatly appreciate any contributions you make.

If you have suggestions or improvements, you can either fork the repository and create a pull request, or open an issue tagged as "enhancement." Don't forget to star the project if you find it helpful!

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE.txt for more information.

Contact
Your Name - @your_twitter - email@example.com

Project Link: https://github.com/your_username/repo_name

Acknowledgments
Here's a space to acknowledge helpful resources and individuals. We're starting off with a few of our favorites:

Choose an Open Source License
GitHub Emoji Cheat Sheet
Malven's Flexbox Cheatsheet
Malven's Grid Cheatsheet
Img Shields
GitHub Pages
Font Awesome
React Icons
