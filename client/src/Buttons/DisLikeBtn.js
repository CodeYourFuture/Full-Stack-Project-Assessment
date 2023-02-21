import React from "react";
import Button from "react-bootstrap/Button";

function DisLikeBtn({ onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      {" "}
      &#128078;{" "}
    </Button>
  );
}

export default DisLikeBtn;
