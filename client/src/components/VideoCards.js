import React,{useState} from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { BsHandThumbsUpFill, BsHandThumbsDownFill} from 'react-icons/bs';
import { RiDeleteBin6Line} from 'react-icons/ri';
// import Modal from 'react-modal';
import '../styles/videoCards.scss';


const VideoCards = ({videoDates}) => {
 
  const opts = {
    playerVars: {
    
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1
    }
  };

   return (
       <div className="card-container">
           {videoDates?videoDates.map(
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
                                <span className="thumbs-icon"><BsHandThumbsUpFill/></span>
                                <p>
                                  {votes}
                                </p>
                                <span className="thumbs-icon"><BsHandThumbsDownFill/></span>
                            </div>
                            <span className="delete-btn"><RiDeleteBin6Line/></span>
                           
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
 