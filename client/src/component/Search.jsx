import React from "react";
import { useState } from "react";

const Search = ({ onSearch, getAllVideo }) => {
  const [searchText, setSearchText] = useState("");
  const [showAllVideos, setShowAllVideos] = useState(false);

  const showAllVideoButton = () => {
    setShowAllVideos(!showAllVideos);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          onSearch(searchText);
          showAllVideoButton();
        }}
      >
        search
      </button>
      {showAllVideos ? (
        <button
          onClick={() => {
            getAllVideo();
            showAllVideoButton();
            setSearchText("");
          }}
        >
          All Videos
        </button>
      ) : null}
    </div>
  );
};
export default Search;
