import React from "react";

const SearchBar = ({ videoData, setVideoData }) => {
  const handleSearch = (e) => {
    const searchVideoData = videoData.filter((video) =>
      video.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setVideoData(searchVideoData);
  };

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
        />
      </form>
    </nav>
  );
};

export default SearchBar;
