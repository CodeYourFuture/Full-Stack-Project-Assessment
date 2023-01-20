import React from "react";
// import dataVideos from "./exampleresponse.json";


function DeleteB(props) {
 

  return (
    <button onClick={props.removeVideo} className="p-2 mb-1 bg-danger text-white delete-button">Delete</button>
  );
}

export default DeleteB;
