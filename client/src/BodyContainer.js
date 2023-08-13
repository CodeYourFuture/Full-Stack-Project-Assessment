import React, { useState } from "react";
import AddVideo from "./AddVideo";
import VideoCards from "./VideoCards";
import Search from "./Search.js";
import exampleResponse from "./exampleResponse.json";

function BodyContainer() {
  const [filterVideos, setFilterVideos] = useState(exampleResponse);

  return (
    <>
      <AddVideo filterVideos={filterVideos} setFilterVideos={setFilterVideos} />
      <VideoCards
        filterVideos={filterVideos}
        setFilterVideos={setFilterVideos}
      />
      <Search />
    </>
  );
}
export default BodyContainer;
