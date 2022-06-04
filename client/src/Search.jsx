import React from "react";
import { useState } from "react";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
function handleSearchInput(event) {
  setSearchInput(event.target.value);
}
  return (
    <>
      <input
        id="customerName"
        className="form-control"
        placeholder="Customer name"
        value={searchInput}
        onChange={handleSearchInput}
      />
      <button>Click me</button>
    </>
  );
};

export default Search;
