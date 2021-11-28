import React, { useState} from "react";


function Vote() {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  return (
      <div className = "votebtn-wrapper">
        <div className = 'upvote-div'>    
      
        <i className="fa fa-thumbs-up" onClick={() => setUpCount(upCount + 1)}></i>
          <p>{upCount}</p>
        </div>
      
        <div className = 'downvote-div'>    
        <p>{downCount}</p>
        {/* <i className="fa fa-thumbs-down" onClick={() => setUpCount(upCount - 1)}></i> */} 
        <i className="fa fa-thumbs-down" onClick={() => setDownCount(downCount - 1)}></i>
        
        </div>
      </div>
    );
}

export default Vote;