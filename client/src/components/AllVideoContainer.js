import React, { useState } from "react";
import VideoContainer from "./VideoContainer";
import ExampleResponse from "../data/exampleresponse.json";
import AddVideo from "./AddVideo";
const AllVideoContainer = () => {
  const [searchVideo, setSearchVideo] = useState("");
  const [allVideo, setAllVideo] = useState(ExampleResponse);
  const HandleOnChangeSearch = (event) => {
    event.preventDefault();
    setSearchVideo(event.target.value);
  };
  const FilteredVideo = allVideo.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  console.log(FilteredVideo);
  return (
    <div>
      <div className="d-flex justify-content-around">
        <div>
          <AddVideo setAllVideo={setAllVideo} />
        </div>
        <form>
          <label htmlFor="videoSearch">Search</label>
          <div>
            <input type="text" id="searchVideo" onChange={HandleOnChangeSearch} />
          </div>
        </form>
      </div>
      <div>
        {/* <VideoContainer allVideo={FilteredVideo} setAllVideo={setAllVideo} /> */}
        <VideoContainer allVideo={allVideo} setAllVideo={setAllVideo} />
      </div>
    </div>
  );
};

export default AllVideoContainer;
