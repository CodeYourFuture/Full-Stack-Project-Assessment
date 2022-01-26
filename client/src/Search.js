import React from "react";

const Search = (props) => {
  return (
    <div>
      <label>
        Search:
        <input type="text" onChange={props.searchHandler}></input>
      </label>
    </div>
  );
};

export default Search;
