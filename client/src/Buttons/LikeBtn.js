import React from "react";
import Button from "react-bootstrap/Button";

function LikeBtn({ onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      {" "}
      &#128077;{" "}
    </Button>
  );
}

export default LikeBtn;
