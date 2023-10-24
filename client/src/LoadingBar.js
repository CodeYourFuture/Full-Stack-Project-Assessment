import React from "react";

const LoadingBar = (props) => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped"
        role="progressbar"
        aria-valuenow="75"
        style={{ width: "100%" }}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        Loading.....
      </div>
    </div>
  );
};

export default LoadingBar;
