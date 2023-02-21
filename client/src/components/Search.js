import React, { useState } from 'react';
import SearchButton from './SearchButton';

const Search = ({ search }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  } 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    search(searchInput);
  }
    return (
      <div>
        <form className="form-group search-box" onSubmit={handleSearchSubmit} >
          <input
            type="text"
            id="customerName"
            // className="form-control"
            placeholder="Search for a video"
            value={searchInput}
            onChange={handleSearchInput}
          />
          <SearchButton />
        </form>
      </div>
    );
}

export default Search
