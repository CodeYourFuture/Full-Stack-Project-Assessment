import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

const Search = () => {
  const { searchString, setSearchString, searchHandler } =
    useContext(UserContext);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search.."
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <button
        className="btn_search"
        type="submit"
        onClick={() => {
          searchHandler(searchString);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
