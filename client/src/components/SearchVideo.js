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

    <div className='search-box'>

      <input className='search-input' name='search-input' type='text' placeholder='Search here' onChange={(e) => { handleSearch(e) }} />
      <FaSearch style={{ color: 'black', fontSize: '20px', marginBottom: '8px', backgroundColor: '#aac3dc', height: '26px', marginTop: '3px' }} />

    </div>

  </>
}

export default SearchVideo;