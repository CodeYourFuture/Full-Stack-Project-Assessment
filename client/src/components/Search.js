import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import SortButton from "./SortButton";
import "../App.css";

const Search = (props) => {
  const [isDescending, toggleOrder] = useState(true);
  const [currentVideo, setVideo] = useState();

  function changeOrder() {
    toggleOrder(!isDescending);
    props.callback(isDescending);
  }

  function searchedVideo(event) {
    setVideo(event.target.value);
  }

  return (
    <>
      <InputGroup className="search">
        <InputGroupAddon
          addonType="prepend"
          type="text"
          placeholder="Search for a video..."
          value={currentVideo}
          onChange={searchedVideo}
        >
          Search
        </InputGroupAddon>
        <Input />
      </InputGroup>
      <SortButton changeOrder={changeOrder} isDescending={isDescending} />
    </>
  );
};

export default Search;
