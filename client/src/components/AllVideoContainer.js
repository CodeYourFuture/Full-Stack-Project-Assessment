import React, { useState } from "react";
import VideoContainer from "./VideoContainer";
import ExampleResponse from "../data/exampleresponse.json";
import AddVideo from "./AddVideo";
const AllVideoContainer = () => {
  const [searchVideo, setSearchVideo] = useState("");
  const [allVideo, setAllVideo] = useState(ExampleResponse);
  const [addNewVc, setAddNewVc] = useState({ title: "", url: "" });
  const { title, url } = addNewVc;
  const HandleOnChangeAdd = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("name");
    setAddNewVc({ ...addNewVc, [key]: event.target.value });
    console.log("hello");
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    allVideo.push(addNewVc);
    setAllVideo(allVideo.filter((vc) => vc));
  };
  const HandleDelete = (event) => {
    event.preventDefault();
    const name = event.target.getAttribute("name");
    setAllVideo(allVideo.filter((vc) => vc.title !== name));
  };
  const HandleOnChangeSearch = (event) => {
    event.preventDefault();
    setSearchVideo(event.target.value);
  };
  const FilteredVideo = allVideo.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  console.log(allVideo);
  return (
    <div>
      <div className="d-flex justify-content-around">
        <div>
          <AddVideo
            handleOnChangeAdd={HandleOnChangeAdd}
            handleSubmit={HandleSubmit}
            title={title}
            url={url}
          />
        </div>
        <form>
          <label htmlFor="videoSearch">Search</label>
          <div>
            <input
              type="text"
              id="searchVideo"
              onChange={HandleOnChangeSearch}
            />
          </div>
        </form>
      </div>
      <div>
        <VideoContainer
          Response={FilteredVideo}
          handleDelete={HandleDelete}
        />
        ;
      </div>
    </div>
  );
};

export default AllVideoContainer;
