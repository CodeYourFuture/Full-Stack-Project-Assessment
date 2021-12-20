import React from "react";

const SearchVideo = ({ searchVideoValue, setSearchVideoValue }) => {
  const handleVideoSearch = (event) => {
    setSearchVideoValue(event.target.value.toLowerCase());
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search Videos by Typing Video Titles ..."
        value={searchVideoValue}
        onChange={handleVideoSearch}
      ></input>
    </div>
  );
};
export default SearchVideo;
