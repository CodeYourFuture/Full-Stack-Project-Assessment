import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";


const SingleVideo = ({video, handleDeleteVideo}) => {
    const [voteCounter, setVoteCounter] = useState(video.rating); 

  return (
      <>
    <div className="col my-4">
        <div className= "d-flex-column m-2">
        <h4>{video.title}</h4>
        <div className="d-flex justify-content-center my-3">                
            <i className="fa fa-thumbs-o-up thumps" onClick={() => setVoteCounter(voteCounter+1)}></i>
            <h5 className="mx-3">{voteCounter} Votes</h5>
            <i className="fa fa-thumbs-o-down thumps" onClick={() => setVoteCounter(voteCounter-1)}></i>
        </div>
        </div>
        <div className= "m-2"> 
            <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${(video.url.split("="))[1]}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </div>        
            <ConfirmModal 
            buttonText="Delete"
            handleConfirm={handleDeleteVideo}
            />
    </div>                
   </>
  );
}

export default SingleVideo;