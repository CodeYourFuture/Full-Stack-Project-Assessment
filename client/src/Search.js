import React, { useState } from "react";


const Search = (props) => {
  console.log(props)
  const [searchInput, setSearchInput] = useState([]);

  function handleSearch(e) {
    console.log(e.target.value);
    const newVideos = props.video.filter(v=> v.title.includes(e.target.value))
    props.setVideos(newVideos)
    setSearchInput(e.target.value);
   }

  return (
    <>
      <input
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={handleSearch}
      />
    {}
    </>
  );
};

export default Search;
