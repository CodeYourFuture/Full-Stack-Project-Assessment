import React from "react";
import { useState } from "react";

const Search = ({ onSearch, getAllVideo }) => {
  const [searchText, setSearchText] = useState("");
  const [showAllVideos, setShowAllVideos] = useState(false);

  const showAllVideoButton = () => {
    setShowAllVideos(!showAllVideos);
  };

  const handleSearch = (text) => {
    if (text) {
      onSearch(text);
      showAllVideoButton();
    } else {
      alert("Please enter a word/words");
    }
  };
  return (
    <div className="search">
      <label htmlFor="search">Search: </label>
      <input
        className="input"
        type="text"
        id="search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
      <button
        className="button"
        onClick={() => {
          handleSearch(searchText);
        }}
      >
        search
      </button>
      {showAllVideos ? (
        <button
          className="button"
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
