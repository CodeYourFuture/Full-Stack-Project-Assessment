import React, { useState } from "react";

export default function SearchVideo({ videoData, setVideoData }) {
    const [searchString, setSearchString] = useState("");
    const originalData = [...videoData];

    const handleSearch = (event) => {
        videoData = originalData;
        setSearchString(event.target.value);
        let filteredResult = videoData.filter((vid) => vid.title.toLowerCase().includes(searchString.toLowerCase()));
        setVideoData(filteredResult);
        console.log(filteredResult.length);
        // if(event.target.value === ""){
        //     setVideoData(originalData);
        // }
    };

  return (
    <div className="search-video">
      <label>Search<input type="text" onChange={handleSearch}></input></label>
      
    </div>
  );
}
