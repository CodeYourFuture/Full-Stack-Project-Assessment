import React from "react";
import "./PopUp.css";

function PopUp(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="innerpop">
        <button className="close" onClick={() => props.setTrigger(false)}>
          Exit
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUp;
