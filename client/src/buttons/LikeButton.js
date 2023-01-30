import React from "react";
import thumb from "../buttons/images/thumbs-up-icon.png";

function LikeButton({increment}) {

    return (
      <button title="likeBtn" onClick={() => increment()}>
        {
          <img
            src={thumb}
            onClick={increment}
            alt=""
            width="20px"
            height="20px"
          /> 
        }
      </button>
    );
}
export default LikeButton

