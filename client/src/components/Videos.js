import React,{useState,useEffect} from "react";
import Votes from "./Votes";
import ReactPlayer from "react-player";


function Videos({ videos,setVideos }) {
  
  const deleteVideo =async (id) =>{

    try {
        const deletVideo = await fetch(`http://localhost:5000/videos/${id}`,{
            method:'DELETE'
        })
        setVideos(videos.filter(video =>video.video_id !==id))
    } catch (err) {
        console.error(err.message)
        
    }
}



  return (
    <div>
    
    <div className="d-flex flex-row flex-wrap align-content-center justify-content-evenly   ">

      {videos.map((item, i) => {
        console.log(item.vating)
        return (
          <div key={i}
            className="d-flex flex-column align-content-center m-2 pb-3 div-cart"
            style={{ width: "20rem" }}
          >
            <h4 className="m-2">{item.title}</h4>
            <Votes vote={item.vating} />
            <div className="mt-2 ">
              <ReactPlayer
                className=""
                fluid={false}
                width={"100%"}
                height={250}
                url={item.url}
              />
            </div>
            <div className="m-2 p-3">
              <button className="btn btn-danger  " onClick={()=>deleteVideo(item.video_id)}>DELETE</button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Videos;
