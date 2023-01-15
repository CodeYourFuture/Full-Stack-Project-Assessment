import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';


function SearchVideo({ videos, setVideos }) {
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
  return <>
    <div class="input-group rounded" id='search'>
      <input
        type="search"
        class="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e) => { handleSearch(e) }} />
      <span class="input-group-text border-0" >
        <FaSearch />
      </span>
    </div>
  </>
}

export default SearchVideo;