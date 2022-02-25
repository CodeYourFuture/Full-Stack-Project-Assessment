import React, { useState } from "react";
import ListOfVideos from "./ListOfVideos";

const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    props.search(searchInput);
  };
  return (
    <div className="search">
      <div className="page-header"></div>
      <div className="row search-wrapper">
        <div className="col">
          <div className="search-row">
            <input
              type="text"
              id="customerName"
              className="form-control"
              placeholder="Customer name"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <button onClick={clickHandler}>Search</button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
