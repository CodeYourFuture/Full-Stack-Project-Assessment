import React, { useState} from "react";


function Vote() {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  return (
      <div className = "votebtn">
        <div className = 'upvote-div'>    
          <button onClick = {() => setUpCount(upCount+1)}> <i
          className="fa fa-thumbs-up"></i></button>
          <p>{upCount}</p>
        </div>
      
        <div className = 'downvote-div'>    
            <p>{downCount}</p>
            <button onClick = {() => setDownCount(downCount-1)}> <i
            className="fa fa-thumbs-down"></i></button>   
        </div>
      </div>
    );
}

export default Vote;