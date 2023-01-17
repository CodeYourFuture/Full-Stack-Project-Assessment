import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from '../context/VideoContext';


function SearchVideo({ videos, setVideos }) {
  const { handleSearch } = useGlobalContext()

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