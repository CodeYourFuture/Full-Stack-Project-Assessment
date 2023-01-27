import React, { useState } from "react";
import data from "./exampleresponse.json";
import VideoCards from "./VideoCards";
function Videos() {
  const [videos, setVideos] = useState(data);
  const [filter, setFilter] = useState(videos);
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
