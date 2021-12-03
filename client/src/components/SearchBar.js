import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="button">
          Search
        </button>
      </form>
    </nav>
  );
};

export default SearchBar;
