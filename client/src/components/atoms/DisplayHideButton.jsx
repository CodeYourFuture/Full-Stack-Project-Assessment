import React from "react";
import "../../App.css";

function DisplayHideButton({ addVideoClicked, setAddVideoClicked, btnTitle }) {
  function formVisibility() {
    addVideoClicked === false
      ? setAddVideoClicked(true)
      : setAddVideoClicked(false);
  }

  return (
    <button className="btn btn-primary margin" onClick={() => formVisibility()}>
      {btnTitle}
    </button>
  );
}
export default DisplayHideButton;
