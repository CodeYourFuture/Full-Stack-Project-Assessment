import React from "react";
import thumb from "../buttons/images/thumbs-down-icon.png";

function DislikeButton({decrement}) {
    return (
      <button title="dislikeBtn" onClick={() => decrement()}>
        {
          <img
            src={thumb}
            onClick={decrement}
            alt=""
            width="20px"
            height="20px"
          /> 
          
         
        }
      </button>
    );
}
export default DislikeButton
