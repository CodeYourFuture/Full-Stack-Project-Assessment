import React from "react";
import "./Search.css";

const Search = ({ videoData, setVideoData, dataVideos }) => {
  const handleOnChange = (event) => {
    let result = videoData.filter((vid) =>
      vid.title.toLowerCase().includes(event)
    );
    setVideoData(result);
    if (event.length <= 0) {
      setVideoData(dataVideos);
    }
  };
  return (
    <div className="searchBar">
      <label className="searchLabel" htmlFor="search">
        Search
      </label>
      <input
        className="searchInp"
        onChange={(e) =>
          handleOnChange(e.target.value.toLocaleLowerCase())
        }
        type="search"
      />
    </div>
  );
};

export default Search;
