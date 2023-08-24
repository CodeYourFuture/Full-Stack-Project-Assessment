import React, { useState } from "react";

export default function Searchbar(props) {
  const [searchInput, setSearchInput] = useState({ search: "" });

  function handleSearchVideo(event) {
    // stops page refresh
    event.preventDefault();
    props.handleSearchVideo(searchInput);
  }

  function handleChange(event) {
    // stops refresh
    event.preventDefault();
    console.log(event.target.value);

    setSearchInput(event.target.value);
  }

  return (
    <>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search..."
        name="search"
      ></input>
      <button onClick={handleSearchVideo}>Search</button>
    </>
  );
}
