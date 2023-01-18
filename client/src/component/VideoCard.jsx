import React from "react";
import Data from "../exampleresponse.json";
import EmbeddingVideo from "./EmbeddingVideo";
import Vote from "./Vote";

function VideoCard(){
   

    return(
        <section className="cards-grid">
            {Data.map(film=>{
            return(<div key={film.id} className="card-container">
                     <EmbeddingVideo  url={film.url}  title={film.title}/>
                     <h5>{film.title}</h5>
                     <div className="card-bottom-nav">
                        <Vote data={film.rating}/>
                     <button className="btn">Remove Video</button>
                     </div>
                     
                  </div>
            )})};
        </section>
    )
}

export default VideoCard;