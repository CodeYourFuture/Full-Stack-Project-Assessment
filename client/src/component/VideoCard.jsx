import React from "react";
import EmbeddingVideo from "./EmbeddingVideo";
import Vote from "./Vote";

function VideoCard(props){
   

    return(
        <section className="cards-grid">
            { 
            props.videosList.map(video=>{
            return(  <div key={video.id} className="card-container">
                        <EmbeddingVideo  url={video.video_url}  title={video.video_title}/>
                        <h5 className="video-title">{video.video_title}</h5>
                        <div className="card-bottom-nav">
                        <Vote data={video.video_rating}/>
                        <button className="btn" onClick={()=>props.setDeletedVideoId(video.id)}>Remove Video</button>
                        </div>
                    </div>
            )})};
        </section>
    )
}

export default VideoCard;