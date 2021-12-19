import React from "react";

const Search = ({ videos, setVideos }) => {
  function handleSearchInput(event) {
    const searchResualt = videos.filter((video) =>
      video.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setVideos(searchResualt);
  }

  return (
    <div className="search">
      <form className="search form">
        <input
          className="input  "
          onChange={handleSearchInput}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>

      <div>
        <button className="button search ">Add Video</button>
      </div>
    </div>
  );
};

export default Search;
