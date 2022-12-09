import React, { useState } from "react";

const SearchBar = ({ search }) => {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(searchInput);
    console.log("Sending data to server");
  }
  return (
    <form>
      <input
        id="search"
        type="text"
        name="search"
        placeholder="Search Here"
        onChange={handleSearchInput}
      />
      <button type="button" class="btn btn-primary" onSubmit={handleSubmit}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
