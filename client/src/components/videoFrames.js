import {React, useState} from 'react';
import "../App.css";
import DeleteVideo from './deleteVideo.js';

const VideoFrames = (props) => {
    const Data = props.Data;
    const handleDelete = props.handleDelete;
        return (
    <div className = "videoframes">     
        {/* <OneVideoFrame Data = {Data} handleDelete = {handleDelete} /> */}
        {Data.map((obj, i) => {
                const videoID = obj["url"].split("=")[1]
                return( 
                <div className = "oneVideoFrame">
                    <h4 key = {i}>{obj["title"]}</h4>
                    <h4>0 votes</h4>
                    <iframe width="560" height="315" 
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