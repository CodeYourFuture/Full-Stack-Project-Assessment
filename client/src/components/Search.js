import React, { useState } from "react";

const Search = ({ videos, setVideos }) => {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    const searchInput = e.target.value.toLowerCase();
    setSearch(searchInput);
    const searchFiltered = videos.filter((video) => {
      return video.title.toLowerCase().includes(searchInput);
    });
    setVideos(searchFiltered);
  }
  return (
    <div className="searchBox">
      <input
        onChange={(e) => {
          handleSearch(e);
        }}
        type="text"
        value={search}
        className="searchBar"
        name="search"
        placeholder="Search Videos"
      />
    </div>
  );
};

export default Search;
