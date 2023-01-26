import React from "react";
import "./Search.css";

const Search = ({ videoData, setVideoData, dataVideos }) => {
  // function to handle search input

  const handleOnChange = (event) => {
    let result = videoData.filter((vid) =>
      vid.title.toLowerCase().includes(event)
    );
    setVideoData(result);
    if (event.length <= 0) {
      fetch(
        "https://full-stack-project-assessment-server.onrender.com/"
      )
        .then((res) => res.json())
        .then((result) => {
          setVideoData(result);
        });
    }
  };
  return (
    <div className="searchBar">
      <label className="searchLabel" htmlFor="search">
        Search
      </label>
      <input
        id="search"
        className="searchInp"
        onChange={(e) => handleOnChange(e.target.value.toLowerCase())}
        type="search"
      />
    </div>
  );
};

export default Search;
