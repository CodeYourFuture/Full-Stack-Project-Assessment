import React from "react";
import "../../assets/scss/dashboard.scss";

export default function DashboardWeek1() {
  return (
    <div className="dashboard">
      <h1># Level Front End</h1>
      <p>
        <span className="Required">## Required Features </span> <br /> 1. Videos
        should be loaded from a local javascript variable containing the data
        included in `exampleresponse.json` <br /> 2. For each video, display a
        React component that contains - The videos title - An embedded video -
        The number of votes the video has - A button that when clicked removes
        the video <br /> 3. On each video submission there should be two buttons
        - "Up Vote" - This increases the vote score when clicked - "Down Vote" -
        This decreases the vote score when clicked <br /> 4. On the page there
        must be another React component that will add a Video. - It should
        include fields to add a - Title - Url - When a button is clicked the
        video should be added to the list <br /> 5. Your website must follow
        accessibility guidelines (see below for more details)
      </p>
    </div>
  );
}
