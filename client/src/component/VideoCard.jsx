import React from "react";
import EmbeddingVideo from "./EmbeddingVideo";
import Vote from "./Vote";

function VideoCard(props){
   

    return(
        <section className="cards-grid">
            {
            props.videosList.sort((a,b) => b.rating - a.rating).map(film=>{
            return(  <div key={film.id} className="card-container">
                        <EmbeddingVideo  url={film.url}  title={film.title}/>
                        <h5 className="film-title">{film.title}</h5>
                        <div className="card-bottom-nav">
                        <Vote data={film.rating}/>
                        <button className="btn" onClick={()=>props.setDeletedVideoId(film.id)}>Remove Video</button>
                        </div>
                    </div>
            )})};
        </section>
    )
}

export default VideoCard;