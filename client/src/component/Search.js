import React from "react";

const Search = ({ searchValue, setSearchValue }) => {
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div>
      <input
        className="m-5"
        type="text"
        placeholder="Search videos ..."
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
