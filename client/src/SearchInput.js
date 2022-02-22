import React from "react";

function SearchInput() {
    return (
      <div>
        <label className="searchInputLabel">
          Search:{' '}
          <input
            type="search"
            className="searchInput"
          />
        </label>
      </div>
    );
}

export default SearchInput;