import React from "react";

function SearchMovie(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie"
        className="searchInput"
        name="searchInput"
        onChange={props.handler}
      />
    </div>
  );
}

export default SearchMovie;
