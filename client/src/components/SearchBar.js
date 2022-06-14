import React from "react";

function SearchBar(props) {
  return (
    <div>
      <input
        type="search"
        placeholder="Search a video..."
        name="search"
        onKeyUp={props}
      />
    </div>
  );
}

export default SearchBar;
