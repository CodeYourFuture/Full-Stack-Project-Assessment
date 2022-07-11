import React from "react";

const Search = (props) => {
  return (
    <div>
      <label>
        Search Your Videos 
        <input type="text" onChange={props.searchHandler}></input>
      </label>
    </div>
  );
};

export default Search;
