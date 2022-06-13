import React from "react";

function SearchBar({ handleSearch }) {
  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="search videos..."
        onKeyUp={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
