import {React, useState} from 'react';
import "../App.css";
import DeleteVideo from './deleteVideo.js';
import VoteCount from './voteCount.js';

const VideoFrames = (props) => {
    const Data = props.Data;
    const handleDelete = props.handleDelete;
        return (
    <div className = "videoframes">     
        {Data.map((obj, i) => {
                const videoID = obj["url"].split("=")[1]
                return( 
                <div key = {i} className = "oneVideoFrame">
                    <h4>{obj["title"]}</h4>
                    <VoteCount upDownVoteCount = {props.upDownVoteCount} handleUpVoteCount = {props.handleUpVoteCount}/>
                    <iframe width="500" height="315" 
                    src={`https://www.youtube.com/embed/${videoID}`} 
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>
                    <DeleteVideo handleDelete = {handleDelete} />                    
                </div>   
                )
            } )}
        
    </div>

        )
}

export default VideoFrames;