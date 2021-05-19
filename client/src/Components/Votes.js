import React from "react";

const Votes = ({elem}) => {
  return (
    <div id="votesContainer">
      <i className="fa fa-thumbs-up fa-1x"></i>
      <h5>{elem.rating} votes</h5>
      <i className="fa fa-thumbs-down fa-1x"></i>
    </div>
  );
};

export default Votes;
