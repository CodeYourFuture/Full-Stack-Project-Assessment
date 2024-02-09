import React, { useState } from "react";

const Search = ({ videos, setVideos, originalState }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    setInput(e.target.value);
    setVideos(
      videos.filter((video) =>
        video.title.toLowerCase().includes(input.toLowerCase())
      )
    );
    if (e.target.value === "") setVideos(originalState);
  };

  return (
    <div className="input-group mt-9">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={handleSearch}
      />
      <button type="button" className="btn btn-outline-primary">
        search
      </button>
    </div>
  );
};

export default Search;
