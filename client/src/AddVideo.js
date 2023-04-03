import React from "react";
import Button from "react-bootstrap/Button";


const AddVideo = (props) => {
  return (
    <Button
      variant="secondary"
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export default React.memo(AddVideo);
