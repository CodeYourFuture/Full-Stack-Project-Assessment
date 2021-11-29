import React, { useState,useEffect } from "react";
import VideoContainer from "./VideoContainer";
// import ExampleResponse from "../data/exampleresponse.json";
import AddVideo from "./AddVideo";
const AllVideoContainer = () => {
   const fetchData = async (endpoint = "") => {
     const res = await fetch(`http://localhost:5000/${endpoint}`);
     const data = await res.json();
     return data;   
   };
   useEffect(()=>{
     fetchData().then((data) => {
       setAllVideo(data);
     });  
   },[])
   
  const [searchVideo, setSearchVideo] = useState("");
  const [allVideo, setAllVideo] = useState([{
    id: 523427,
    title: "The Coding Train",
    url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
    rating: 230,
  }]);
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
        <VideoContainer allVideo={allVideo} setAllVideo={setAllVideo} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default AllVideoContainer;
