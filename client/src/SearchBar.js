import React, { useState } from "react";
import data from "./exampleresponse.json";

const SearchBar = () => {
  const [videos, setVideos] = useState(data);
  const search = (event) => {
    const videoSearch = videos.filter((video) =>
      video.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setVideos(videoSearch);
  };
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={search}
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
};

export default SearchBar;
