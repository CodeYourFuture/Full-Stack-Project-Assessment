import React from "react";
const Search = ({ searchInput, setSearchInput }) => {
  function onChangeSearch(event) {
    setSearchInput(event.target.value);
  }

  return (
    <div>
      <input
        className="input is-primary"
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={onChangeSearch}
      />
    </div>
  );
};

export default Search;
