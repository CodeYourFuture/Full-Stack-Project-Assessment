import React from "react";

function DislikeButton({decrement}) {
    return (
      <button title="dislikeBtn" onClick={() => decrement()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          https://icons8.com/icon/cPJTvqEzTYvb/thumbs-down
        </svg>
      </button>
    );
}
export default DislikeButton