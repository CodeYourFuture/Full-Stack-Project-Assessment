import React from "react";

function SearchBar(props) {
  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        name="search"
        onKeyUp={props.handleSearch}
      />
    </div>
  );
}

export default SearchBar;
