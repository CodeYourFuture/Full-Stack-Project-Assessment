import React,{useState} from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { BsHandThumbsUpFill, BsHandThumbsDownFill} from 'react-icons/bs';
import { RiDeleteBin6Line} from 'react-icons/ri';
import { FaHeart} from 'react-icons/fa';
// import Modal from 'react-modal';
import '../styles/videoCards.scss';


const VideoCards = ({videoDates}) => {
 const [giveVote, setGiveVote]=useState(0);

  const opts = {
    playerVars: {
    
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1
    }
  };


  const handleGiveVotes =()=>{
    if(giveVote!==1)
    setGiveVote(giveVote+1);
  }

  const handleRemoveVotes =()=>{
    if(giveVote!==0)
    setGiveVote(giveVote-1);
  }

   return (
       <div className="card-container">
           {videoDates?videoDates.sort((a,b)=>b.votes-a.votes).map(
              ({title,video_id,votes}, index) => {
                return (
                  <div className="video-card" key={index}>
                    <div className="video">
                      <YouTube
                        videoId={video_id}
                        containerClassName="embed embed-youtube"
                        // onStateChange={(e) => checkElapsedTime(e)}
                        opts={opts}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="title">{title}</h3>
                      <div className="card-info">
                        <div className="votes">
                            <span className="thumbs-icon" onClick={handleGiveVotes}><BsHandThumbsUpFill/></span>
                            <p>
                              {votes+giveVote}
                            </p>
                            <span className="thumbs-icon" onClick={handleRemoveVotes}><BsHandThumbsDownFill/></span>
                        </div>
                        <div>
                        <span className="delete-btn"><FaHeart/></span> 
                        <span className="delete-btn"><RiDeleteBin6Line/></span> 
                        </div>
                      </div>     
                    </div>
                  </div>
              );
              }
              )
            : "Loading..."}
       </div>
   );
 };
 
 export default VideoCards;
 