import React from "react";
// import dataVideos from "./exampleresponse.json";


const Search = (props) => {
  return (
    <div className="input-group shadow-sm bg-white rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search-addon"
         onChange={props.handler}
      />
       
      <button type="button" className="btn btn-outline-primary">
        search
      </button>
    </div>
  );
};

export default Search;
