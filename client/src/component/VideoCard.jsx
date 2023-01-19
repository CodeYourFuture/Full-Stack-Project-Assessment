import React from "react";
import Data from "../exampleresponse.json";
// import DeleteVideo from "./DeleteVideo";
import EmbeddingVideo from "./EmbeddingVideo";
import { useState, useEffect} from "react";
import Vote from "./Vote";

function VideoCard(){
   const [videosList , setVideosList]=useState(Data);
   const [deletedVideoId,setDeletedVideoId]=useState(null);
   
  useEffect(function removeSelectedVideo(){
      // let targetedVideoIndex = videosList.findIndex((video) =>video.id == deletedVideoId);
      let filteredVideos = videosList.filter((video) =>video.id != deletedVideoId);
      setVideosList(filteredVideos);
   },[deletedVideoId]);

    return(
        <section className="cards-grid">
            {videosList.map(film=>{
            return(<div key={film.id} className="card-container">
                     <EmbeddingVideo  url={film.url}  title={film.title}/>
                     <h5 className="film-title">{film.title}</h5>
                     <div className="card-bottom-nav">
                        <Vote data={film.rating}/>
                        <button className="btn" onClick={()=>setDeletedVideoId(film.id)}>Remove Video</button>
                        {/* <DeleteVideo video={film}/> */}
                     </div>
                     
                  </div>
            )})};
        </section>
    )
}

export default VideoCard;