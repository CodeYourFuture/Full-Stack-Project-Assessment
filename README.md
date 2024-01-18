# Video Hub

Video Hub is a platform where users can share their favorite YouTube videos, allowing others to discover, upvote, downvote, and engage with the content. Whether you're looking for trending videos, exploring diverse topics, or simply wanting to share entertaining content, Video Hub is the go-to place.

## User Stories

- As a user, I want to be able to view a list of all YouTube videos posted on the site
- As a user, I want to be able to post videos that I like from YouTube to my website.
- As a user, I want to be able to delete videos from the website that I no longer like.
- As a user, I want to be able to watch the videos embedded in the website.
- As a user, I want to be able to "Up Vote" a video if I like it.
- As a user, I want to be able to "Down Vote" a video if I dislike.

## Key Features

- Add Videos
  Users can contribute to the Video Hub by adding links to their favorite YouTube videos.

- Vote System
  The platform incorporates an Up Vote and Down Vote system, enabling users to express their preferences and influence the visibility of videos.

- Sort and Search
  Videos can be sorted in both ascending and descending order, making it easy to discover trending content. Additionally, users can search for specific videos based on keywords.

- Delete Videos
  Contributors have the ability to manage submissions and remove videos when needed.

## Technologies Used

- React: Front-end framework for building the user interface.
- Express: Back-end framework for handling server-side logic and API requests.
- PostgreSQL: Database for storing video information and user data.
- Material-UI (MUI): React UI framework for designing consistent and aesthetically pleasing user interfaces.

## How to Use the Application

- Add a Video:
  Navigate to the "Add Video" section.
  Paste the YouTube link and provide a brief description.
  Click "ADD" to share the video with the community.

- Vote on Videos:
  Browse through the video list and use the Up Vote and Down Vote buttons to express your preferences.

- Sort and Search:
  Utilize the sorting toggle button to view videos in ascending or descending order.
  Enter keywords in the search bar to find specific videos.

- Delete videos:
  Remove videos that are no longer relevant or desired.

## Prerequisites to Setting Up the Project

- Node.js v18 and npm
- Git

## Getting Started

- Follow these steps to set up and run the Video Hub project locally:

  1. Clone this repository to your computer.

  ```sh
    git clone https://github.com/farzaneh-haghani/Full-Stack-Project-Assessment.git
  ```

  2. Create a new database named "video_hub" in the postgreSQL shell. Ensure you have PostgreSQL installed on your machine.

  ```sql
      CREATE DATABASE video_hub;
  ```

  3. Create table and Import Sample Data.

  ```sh
        psql video_hub
        cd server
        \include videos.sql
  ```

  4. Create a `.env` file in the server of the project:

  ```sh
    URL_DB=postgresql://localhost:5432/video_hub
  ```

  5. Navigate to the project directory:

  ```sh
    cd Full-Stack-Project-Assessment
  ```

  6. Open two new terminal window and install Dependencies

  ```sh
      cd client
      npm install
      npm start
  ```

  ```sh
      cd server
      npm install
      npm run dev
  ```

  7. Open the Application
     Open your browser and visit http://localhost:3000 in your browser to view the app and access the Video Hub.

Happy video sharing!
