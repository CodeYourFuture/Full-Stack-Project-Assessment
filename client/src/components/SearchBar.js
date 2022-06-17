import React from "react";
import '../styles/searchBar.scss';

const SearchBar = () => {
  const handleSearchQuery = (e) => {
  };
  const handleSelectOption = (e) => {
  };
  return (
      <div className="search-bar">
        <form className="search-form">
          <input
            type="search"
            onChange={handleSearchQuery}
            placeholder="Search..."
          />
        </form>
        <p>24 videos</p>
        
      </div>
  );
};

export default SearchBar;
