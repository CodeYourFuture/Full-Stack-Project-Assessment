import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from '../context/VideoContext';


function SearchVideo({ videos, setVideos }) {
  const { handleSearch } = useGlobalContext()

  return <>
    <div className="input-group rounded" id='search'>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e) => { handleSearch(e) }} />
      <span className="input-group-text border-0" >
        <FaSearch />
      </span>
    </div>
  </>
}

export default SearchVideo;