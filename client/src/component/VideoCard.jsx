import React from "react";
import EmbeddingVideo from "./EmbeddingVideo";
import Vote from "./Vote";

function VideoCard(props){
   

    return(
        <section className="cards-grid">
            { 
            props.videosList.map(film=>{
            return(  <div key={film.id} className="card-container">
                        <EmbeddingVideo  url={film.video_url}  title={film.video_title}/>
                        <h5 className="film-title">{film.video_title}</h5>
                        <div className="card-bottom-nav">
                        <Vote data={film.video_rating}/>
                        <button className="btn" onClick={()=>props.setDeletedVideoId(film.id)}>Remove Video</button>
                        </div>
                    </div>
            )})};
        </section>
    )
}

export default VideoCard;