import React, { useState } from "react";

const Search = ({ searchQuery, setSearchQuery, searchFunc }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleChange = ({ target }) => {
    const query = target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      searchFunc();
    }
  };
  return (
    <div className="search-container">
      <div className={expanded ? "search-bar expanded" : "search-bar"}>
        <input
          type="text"
          id="searchInput"
          placeholder="Search"
          value={searchQuery}
          onKeyDown={handleEnterPress}
          onChange={handleChange}
          onBlur={handleClick}
        />
        <span
          id="searchIcon"
          className="magnifier"
          onClick={handleClick}
        ></span>
      </div>
    </div>
  );
};

export default Search;
