import React from "react";
import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
      <button onClick={() => onSearch(searchText)}>search</button>
    </div>
  );
};
export default Search;
