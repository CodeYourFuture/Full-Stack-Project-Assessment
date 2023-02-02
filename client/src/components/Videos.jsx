import React, { useState, useEffect } from "react";
import data from "./exampleresponse.json";
import VideoCards from "./VideoCards";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState(videos);
  useEffect(() => {
    fetch(`http://localhost:5000/videos`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setFilter(videos);
        // console.log(data);
      });},[])
    console.log()
  const handleSearch = (e) => {
    if (e.target.value === "") {
      setFilter(videos);
    } else {
      setFilter(
        videos.filter((video) =>
          video.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <div>
        <h1>Videos Recommendation app</h1>
      </div>
      <div>
        <input type="text" placeholder="Search" onChange={handleSearch} />
      </div>
      <div>
        {filter.map((video, index) => (
          <div>
            <VideoCards video={video} data={setFilter} videos={filter} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Videos;
