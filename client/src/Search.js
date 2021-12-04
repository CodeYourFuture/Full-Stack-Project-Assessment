import React from "react";

function Search({ setVideos, data }) {
  function handleSearchInput(event) {
    const searchVideo = data.filter((video) =>
      video.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setVideos(searchVideo);
  }

  return (
    <div>
      <form className="form-group search-box">
        <div className="search-row">
          <input
            type="text"
            id="search-video"
            className="form-control"
            placeholder="search video..."
            onChange={handleSearchInput}
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
