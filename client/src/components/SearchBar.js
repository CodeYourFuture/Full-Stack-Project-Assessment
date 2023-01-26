import React from "react";

function SearchBar({wordEntered, setWordEntered }) {
  
  return (
    <div className="search">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              value={wordEntered}
              onChange={(event) => setWordEntered(event.target.value)}
            />
          </form>
        </div>
  );
}

export default SearchBar;