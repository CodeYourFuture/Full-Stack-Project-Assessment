# Video Recommendation Front-end

This is the front-end code for the Video App project. The front-end is built using React and communicates with the backend API to manage and display videos.

## Demo

https://cyf-shayanmahnam-video-recommendation.netlify.app/

## Getting Started

To run the front-end locally, follow these steps:

1. Make sure you have Node.js installed on your machine.
2. Clone this repository to your local machine.
```bash
    https://github.com/ShayanMahnam/Full-Stack-Project-Assessment.git
```
3. Open a terminal and navigate to the project directory.
```bash
   cd client
```
4. Run the following command to install the dependencies:

```bash
   npm install
```
5. After the installation is complete, start the development server with the following command:
```bash
   npm start
```
6. The front-end should now be running locally. Open your web browser and navigate to http://localhost:3000 to access the application.

---

## Configuration
### Environment Variables
The Video Recommendation front-end relies on environment variables for certain configurations. Before running the application, make sure to set up the following environment variable:

- REACT_APP_API_URL: The base URL of the backend API. It should point to the API endpoint where the video data is retrieved from.
To configure the environment variable, create a .env file in the root directory of the client folder and define the variables as follows:
```bash
   REACT_APP_API_URL="http://localhost:8080"
```
---

## Usage
The Video App front-end provides a user interface for managing and viewing videos. The main components of the front-end are:

- TopBar: Allows users to add new video cards and change the sorting order.
- Cards: Displays a list of video cards fetched from the backend API.
- Card: Represents an individual video card with details, including the ability to rate and delete the card.

You can customize and extend the front-end code to fit your specific requirements.

---
## Dependencies
The front-end code relies on the following dependencies:

react: JavaScript library for building user interfaces.
react-dom: React package for DOM rendering.
react-icons: Library for using icons in React components.
react-scripts: Set of scripts and configuration used by Create React App.
For detailed information about the dependencies and their versions, refer to the package.json file.

---

## Contributing
Contributions to the Video Recommendation project are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.