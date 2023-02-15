import React from "react";
import "../../assets/scss/dashboard.scss";

export default function DashboardWeek1() {
  return (
    <div className="dashboard">
      <h1># Level 200 - Week 2 - Back End</h1>
      <p>
        <span className="Required">## How to read this guide </span> <br />
        Below are separate headings for each endpoint. Each of them are
        separated into the `HTTP Request <br />
        Method` type and the route that the endpoint should exist on. <br />
        For a recap on about HTTP Request Methods you can read here <br />
        https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods <br />
        - `GET` is the request method <br />
        - "/" is the route <br />
        On Line 8 of `server.js` you can find an example of the first endpoint
        that you will need to make. <br />
        <span className="Required">## Project </span> <br />
        Before starting this project you should run these commands to install
        the project cd server <br />
        npm install <br />
        to run the server you can use <br />
        npm run dev <br />
        To confirm your server is running go to <br />
        http://127.0.0.1:5000/ <br />
        in your browser. If the server is running you'll see a message saying{" "}
        <br />
        ```json <br />
        "express": "Your Backend Service is Running" <br />
      </p>
    </div>
  );
}
