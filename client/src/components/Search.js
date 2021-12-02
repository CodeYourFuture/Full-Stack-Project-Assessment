import React from "react";

const Search = ({ setSearchQuery }) => {
  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setSearchQuery(searchWord);
  };
  return (
    <div className="navbar navbar-dark m-3 justify-content-center">
      <input type="text" placeholder="Search..." onChange={handleFilter} />
    </div>
  );
};

export default Search;
