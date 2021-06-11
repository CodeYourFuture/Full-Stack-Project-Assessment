import {React, useEffect, useState} from 'react';
import { FaThumbsUp, FaThumbsDown} from "react-icons/fa";
import "../App.css";
import DeleteVideo from './deleteVideo.js';


const OneVideoFrame = (props) => {
    let [upDownVoteCount, setUpDownVoteCount] = useState();
    useEffect(() => {
        setUpDownVoteCount(props.rating)
    }, [props.rating])
        
    const handleUpDownVoteCount = (event) => {
        const noOfVoteCount = event.currentTarget;
        console.log(noOfVoteCount);
        if( noOfVoteCount.classList.contains("upVotes")){
            setUpDownVoteCount(upDownVoteCount + 1)
        } else {
            setUpDownVoteCount(upDownVoteCount - 1)
        }
    }
    return( 
            <div className = "oneVideoFrame">
                <h4>{props.videoTitle}</h4>
                <iframe width="500" height="315" 
                src={`https://www.youtube.com/embed/${props.videoID}`} 
                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
                <div className = "delVot">
                <DeleteVideo setDisplayVideos = {props.setDisplayVideos} allVideos = {props.allVideos} />  
                <div className = "voteCounts">
                    <button onClick = {handleUpDownVoteCount}  className = "upVotes" ><FaThumbsUp className = "classIcon"/></button>
                    <h4>{upDownVoteCount} votes</h4>
                    <button onClick = {handleUpDownVoteCount} className = "downVotes"><FaThumbsDown className = "classIcon"/></button>   
                </div>  
                </div>                
            </div>   
            )
        
    
}

export default OneVideoFrame;