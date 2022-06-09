import React from "react";

function Search({ handleSearch }) {
  return (
    <div className="search">
      {/* <label></label> */}
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

export default Search;
