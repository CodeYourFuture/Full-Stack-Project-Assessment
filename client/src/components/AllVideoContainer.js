import React, { useState,useEffect } from "react";
import VideoContainer from "./VideoContainer";
import FetchData from "./fetchData";
import exampleresponse from "../data/exampleresponse.json"
import AddVideo from "./AddVideo";
const AllVideoContainer = () => {
  //--------------------------use fetch API from server-----------------------------//
 const [allVideo, setAllVideo] = useState(exampleresponse);
   useEffect(()=>{
     FetchData().then((data) => {
       setAllVideo(data);
     });  
   },[])
   //--------------------------------search bar-------------------------------------// 
  const [searchVideo, setSearchVideo] = useState("");
  const HandleOnChangeSearch = (event) => {
    event.preventDefault();
    setSearchVideo(event.target.value);
  };
  const FilteredVideo = allVideo.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  console.log(FilteredVideo);
  //---------------------------------------------------------------------------------//
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
        <VideoContainer allVideo={allVideo} setAllVideo={setAllVideo} FetchData={FetchData} />
      </div>
    </div>
  );
};

export default AllVideoContainer;
