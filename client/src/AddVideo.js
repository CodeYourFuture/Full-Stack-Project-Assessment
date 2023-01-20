import React from "react";
import Button from "react-bootstrap/Button";


// import classes from "./Button.module.css";

const AddVideo = (props) => {
  return (
    <Button
      variant="secondary"
      type={props.type || "button"}
      // className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export default React.memo(AddVideo);
