import React, { useState } from "react";
import VideoContainer from "./VideoContainer";
import ExampleResponse from "../data/exampleresponse.json";
const AllVideoContainer = () => {
  const [searchVideo, setSearchVideo] = useState("");
  const FilteredVideo = ExampleResponse.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  return (
    <div>
      <div>
        <form>
          <label htmlFor="videoSearch">Search</label>
          <div>
            <input
              type="text"
              id="searchVideo"
              onChange={(event) => {
                setSearchVideo(event.target.value);
              }}
            />
          </div>
        </form>
      </div>
      <div>
        <VideoContainer Response={FilteredVideo} />;
      </div>
    </div>
  );
};

export default AllVideoContainer;
