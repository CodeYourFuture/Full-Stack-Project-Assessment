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
          
          /* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          https://icons8.com/icon/cPJTvqEzTYvb/thumbs-down
        </svg> */
        }
      </button>
    );
}
export default DislikeButton