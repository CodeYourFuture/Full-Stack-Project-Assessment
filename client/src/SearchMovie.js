import React from "react";

function SearchMovie(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie"
        className="searchInput"
        name="searchInput"
        value={props.searchValue}
        onChange={props.handler}
      />
    </div>
  );
}

export default SearchMovie;
