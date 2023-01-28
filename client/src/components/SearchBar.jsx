import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = ({ data, setData, backup }) => {
  const [term, setTerm] = useState("");
  //This handles the search bar input and finding the results

  const onInputChange = (e) => {
    setTerm(e.target.value);
    let searchResult = data.filter((video) => video.title.toLowerCase().includes(term.toLowerCase()));
    setData(searchResult);
    if (!e.target.value){
      setData(backup);
    }
  };
  return (
    <div className="Search-video Forms-container">
      <form className="forms">
        <label htmlFor="term" className="labels"> Type Search</label>
        <input
          type="text"
          value={term}
          placeholder="Enter search term"
          onChange={onInputChange}
          className="input"
        />
      </form>
    </div>
  );
};

export default SearchBar;
