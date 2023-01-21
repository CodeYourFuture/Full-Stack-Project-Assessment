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
          /> /* <svg
xmlns="http://www.w3.org/2000/svg"
x="0px" y="0px"
width="16" height="16"
viewBox="0 0 16 16" color="red" fill="currentColor"
><path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path></svg> */
        }
      </button>
    );
}
export default LikeButton

