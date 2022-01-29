import React, { useState } from "react";

export default function VideoSearch() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <input
      className="searchBar"
      type="text"
      placeholder="Search"
      name="search"
      value={searchValue}
      onChange={handleSearch}
    ></input>
  );
}
