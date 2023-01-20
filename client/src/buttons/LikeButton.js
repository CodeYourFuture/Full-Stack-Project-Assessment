import React from "react";

function LikeButton({increment}) {

    return (
      <button title="likeBtn" onClick={() => increment()}>
        <svg width="16" height="16">https://icons8.com/icon/FYJ9HNSqf_uK/thumbs-up</svg>
      </button>
    );
}
export default LikeButton