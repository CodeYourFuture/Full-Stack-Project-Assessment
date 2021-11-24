import React, { useState } from "react";
import VideoContainer from "./VideoContainer";
import ExampleResponse from "../data/exampleresponse.json";
const AllVideoContainer = () => {
  const [searchVideo, setSearchVideo] = useState("");
  const [allVideo, setAllVideo] = useState(ExampleResponse);
  const HandleDelete = (event) => {
    const name = event.target.getAttribute("name");
    setAllVideo(allVideo.filter((vc) => vc.title !== name));
  };
  const handleOnChange = (event)=>{
    setSearchVideo(event.target.value);
  }
  const FilteredVideo = allVideo.filter((video) =>
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
              onChange={handleOnChange}
            />
          </div>
        </form>
      </div>
      <div>
        <VideoContainer Response={FilteredVideo} handleDelete={HandleDelete} />;
      </div>
    </div>
  );
};

export default AllVideoContainer;
