import React from "react";
import { Button } from "reactstrap";
import "../App.css";

const SortButton = (props) => {
  return (
    <Button
      onClick={props.changeOrder}
      color="info"
      className="sortButton"
      type="submit"
      block
    >
      Set video order to {props.isDescending ? " descending" : " ascending"}
    </Button>
  );
};

export default SortButton;
