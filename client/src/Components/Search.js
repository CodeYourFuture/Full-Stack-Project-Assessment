import React from "react";

const Search = ({ searchVideo }) => {
  return (
    <div id="searchContainer">
      <h5>Search</h5>
      <input type="text" placeholder="Search Video" onChange={searchVideo} />
    </div>
  );
};

export default Search;
