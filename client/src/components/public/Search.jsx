import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "../../styles/search.css";

const Search = () => {
  const { searchString, setSearchString, searchHandler } =
    useContext(UserContext);

  return (
    <div className="search-container">
      <input
        className="search_bar"
        type="text"
        placeholder="Search.."
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <button
        className="search_btn"
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
