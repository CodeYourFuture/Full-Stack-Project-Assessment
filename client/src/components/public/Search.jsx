import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import "../../styles/search.css";

const Search = () => {
  const {
    searchString,
    setSearchString,
    searchHandler,
    showAllVideosHandler,
    isActive,
    setIsActive,
  } = useContext(UserContext);

  return (
    <div className="search-container">
      {isActive === true && (
        <button
          className="all_Videos_btn"
          type="submit"
          onClick={() => {
            showAllVideosHandler();
            setIsActive(false);
          }}
        >
          All Videos
        </button>
      )}
      <input
        className="search_bar"
        type="text"
        placeholder="Search.."
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      {isActive === false && (
        <button
          className="search_btn"
          type="submit"
          onClick={() => {
            searchHandler(searchString);
            searchString.length > 0 && setIsActive(true);
          }}
        >
          Search
        </button>
      )}
    </div>
  );
};

export default Search;
