import React, { useState } from "react";

const Search = ({ setVideoData, videoData, backup }) => {
  const [videosFilter, setVideosFilter] = useState("");

  const handler = (e) => {
    setVideosFilter(e.target.value);
    setVideoData(
      videoData.filter((video) =>
        video.title.toLowerCase().includes(videosFilter.toLowerCase())
      )
    );
    if (e.target.value === "") setVideoData(backup);
  };

  return (
    <div className="input-group shadow-sm bg-white rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={handler}
      />

      {/* <button type="button" className="btn btn-outline-primary">
        search
      </button> */}
    </div>
  );
};

export default Search;
