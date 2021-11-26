import React from "react";

const Search = ({ videoData, setVideoData }) => {
  // console.log(videoData);
  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    const newFilter = videoData.filter((value) => {
      return value.title.toLowerCase().includes(searchWord);
    });
    setVideoData(newFilter);
  };
  return (
    <div className="navbar navbar-dark m-3 justify-content-center">
      <input type="text" placeholder="Search..." onChange={handleFilter} />
    </div>
  );
};

export default Search;
