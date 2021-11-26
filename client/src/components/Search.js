import React from 'react';
import SearchButton from './SearchButton';

const Search = () => {
    return (
      <div>
        <form className="form-group search-box">
          <input
            type="text"
            id="customerName"
            // className="form-control"
            placeholder="Search for a video"
            // value={searchInput}
            // onChange={handleSearchInput}
          />
          <SearchButton />
        </form>
      </div>
    );
}

export default Search
