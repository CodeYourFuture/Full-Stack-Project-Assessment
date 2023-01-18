import React from "react";
import Data from "../exampleresponse.json";
import { useState } from "react";
import Vote from "./Vote";

function VideoCard(){
   

    return(
        <section className="cards-grid">
            {Data.map(film=>{
            return(<div key={film.id} className="card-container">
                     <video width="320" height="240" controls autoPlay>
                         <source src={film.url} />
                     </video>
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