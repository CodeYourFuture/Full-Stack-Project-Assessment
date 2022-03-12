import React from "react";

function Search({ setVideos, videos }) {
  function searchInput(event) {
    const searchedVideo = videos.filter((video) =>
      video.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setVideos(searchedVideo);
  }

  return (
    <div>
      <form className="form-group search-box ">
        <div className="search-row">
          <input
            type="text"
            id="search-video"
            className="form-control bg-dark bg-gradient text-white border-4 border-dark rounded"
            placeholder="search video..."
            onChange={(event) => searchInput(event)}
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
