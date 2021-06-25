import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleChangeInput = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setSearchInput(searchWord);
    search(searchWord);
  };
  return (
    <div className="col-5 m-5 mx-auto">
      <label htmlFor="search" className="m-2">
        Search
      </label>
      <input
        id="search"
        type="text"
        value={searchInput}
        className="input mx-2"
        onChange={handleChangeInput}
      ></input>
    </div>
  );
};
export default Search;
