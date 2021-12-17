import React from "react";

const SearchBar = ({ videoData, setVideoData }) => {
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      const searchVideoData = videoData.filter((video) =>
        video.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setVideoData(searchVideoData);
    }
    return setVideoData(videoData);
  };
  return (
    <nav className="navbar justify-content-between">
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
