import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import "../App.css";

const Example = () => {
  return (
    <InputGroup className="search">
      <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
      <Input />
    </InputGroup>
  );
};

export default Example;
