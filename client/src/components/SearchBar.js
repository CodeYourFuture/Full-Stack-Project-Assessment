import React from "react";

const SearchBar = (props) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Search a video..."
        name="search"
        onKeyUp={props.search}
      />
    </div>
  );
};

export default SearchBar;
