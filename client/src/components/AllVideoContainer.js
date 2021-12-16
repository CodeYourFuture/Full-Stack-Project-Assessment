import React, { useState,useEffect } from "react";
import VideoContainer from "./VideoContainer";
import FetchData from "./fetchData";
import exampleresponse from "../data/exampleresponse.json"
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
const AllVideoContainer = () => {
  //--------------------------use fetch API from server-----------------------------//
 const [allVideo, setAllVideo] = useState(exampleresponse);

   useEffect(()=>{
     FetchData().then((data) => {
       setAllVideo(data);
     });  
   },[])
   //--------------------------------search bar-------------------------------------// 
 
  
  
  //---------------------------------------------------------------------------------//
  return (
    <div>
      <div className="d-flex justify-content-around">
        <div>
          <AddVideo setAllVideo={setAllVideo} FetchData={FetchData} />
        </div>
        <SearchVideo allVideo={allVideo} setAllVideo={setAllVideo}/>
      </div>
      <div>
        {/* <VideoContainer allVideo={FilteredVideo} setAllVideo={setAllVideo} /> */}
        <VideoContainer
          allVideo={allVideo}
          setAllVideo={setAllVideo}
          FetchData={FetchData}
        />
      </div>
    </div>
  );
};

export default AllVideoContainer;
