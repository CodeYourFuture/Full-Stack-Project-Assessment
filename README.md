# Video Recommendation App
The Video Recommendation App is a full-stack application that enables users to manage their favorite YouTube videos. Users can perform the following actions:

# User stories:
1 - Add Favorite Videos: As a user, I want to be able to add my favorite YouTube videos to the app by providing the video URL.
2 - Like/Unlike Videos: As a user, I want to be able to like or unlike videos to express my preference.
3 - Search Videos: As a user, I want to be able to search for specific videos by entering keywords or tags.
4 - Remove Videos: As a user, I want to be able to remove videos from my list of favorites whenever I want.

# Deployment: 
The app is deployed using GitHub Actions, which is configured to automatically apply new changes to the AWS resources with each commit.

# Technologies Used:
**Frontend**: The frontend is built using React, a popular JavaScript library for creating user interfaces. React hooks such as useState, useEffect, and react-router are employed for efficient state management and routing. The frontend is hosted on Render and AWS S3, ensuring reliable and scalable hosting.

**Backend**: The backend is powered by Node.js and Express, a web application framework for Node.js that simplifies server-side development. Express-validator middleware is used for straightforward and customizable validation of user input. The backend is hosted on Render and AWS EC2, ensuring high availability and scalability.

**Database**: The app utilizes PostgreSQL, a powerful open-source relational database management system, to store and manage video data. The PostgreSQL database is hosted on Render and AWS RDS for reliable and scalable database hosting.

# **Demo:**

[Watch the Video Demo](https://www.youtube.com/yourvideolink)

This video demonstrates the functionality of the Video Recommendation App running on AWS resources. In the demo, you'll see how to add favorite YouTube videos, like or unlike them, search for specific videos, and remove videos from your list of favorites. The application is hosted on AWS, and changes are automatically applied to AWS resources with the help of GitHub Actions.

**Additionally**, you can view our GitHub Actions workflows [here](https://github.com/seyyednavid/Video-recommendation-app/actions), which automate the deployment process. For each commit, two workflows are triggered: one for the frontend and one for the backend, ensuring that both are run and updated after every commit.
