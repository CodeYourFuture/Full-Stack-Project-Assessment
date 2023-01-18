import React from "react";

function AddVideo(){
    return(
        <div className="add-video">
          <h4>Add Your Suggestion Here</h4>
          <input id="add-title" type="text" placeholder="video Title"></input>
          <input id="add-url" type="url" placeholder="video Url"></input>
          <button className="btn" >Add Video</button>
         </div>
    )
}

export default AddVideo;