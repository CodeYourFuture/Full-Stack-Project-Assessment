import React, { useState } from "react";
import { Button } from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import "../App.css";

const Adding = () => {
  const [showResults, setShowResults] = useState(false);
  const onClick = () => {
    // I had
    let newValue = !showResults;
    setShowResults(newValue);
  };
  return (
    <>
      <Button outline color="info add-video" onClick={onClick}>
        Add video
      </Button>
      <div>
        {showResults ? (
          <div>
            <InputGroup className="search">
              <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
              <Input />
            </InputGroup>
            <InputGroup className="search">
              <InputGroupAddon addonType="prepend">URL</InputGroupAddon>
              <Input />
            </InputGroup>
            <Button color="warning">Cancel</Button>
            <Button color="danger">Add</Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Adding;
