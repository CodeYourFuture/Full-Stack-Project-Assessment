import React from "react";
import Data from "../exampleresponse.json";
import { useState } from "react";
import {SlLike,SlDislike} from "react-icons/sl";

function VideoCard(){
    const [vote , setVote]=useState([]);
    const likeFunc=()=>{
         setVote(preVote=> preVote+1)
    }

    const disLikeFunc=()=>{
        setVote(preVote=>preVote>0? preVote-1:0)
    }

    return(
        <section className="cards-grid">
            {Data.map(film=>{
            return(<div key={film.id} className="card-container">
                     <video width="320" height="240" controls autoPlay>
                         <source src={film.url} />
                     </video>
                     <h5>{film.title}</h5>
                     <div className="card-bottom-nav">
                        <section className="vote-icons">
                        <SlLike className="like" onClick={likeFunc} />
                        <h6 className="votes">{film.rating} Votes</h6>
                        <SlDislike className="like" onClick={disLikeFunc} />
                     </section>
                     <button className="btn">Remove Video</button>
                     </div>
                     
                  </div>
            )})};
        </section>
    )
}

export default VideoCard;