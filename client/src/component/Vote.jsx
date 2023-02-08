import React from "react";
import {SlLike,SlDislike} from "react-icons/sl";
import { useState } from "react";

function Vote(props){
    
    const [vote , setVote]=useState(props.data);
    const likeFunc=()=>{
         setVote(vote+1)
    }

    const disLikeFunc=()=>{
        setVote(vote>0? vote-1:0)
    }
    return(
        <section className="vote-icons">
                        <SlLike className="like" onClick={likeFunc} />
                        <h6 className="votes">{vote} Votes</h6>
                        <SlDislike className="like" onClick={disLikeFunc} />
                     </section>
    )
}

export default Vote;