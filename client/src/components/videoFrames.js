import {React} from 'react';
import "../App.css";
import OneVideoFrame from './oneVideoFrame';


const VideoFrames = (props) => {
    return (    
          <div className = "videoframes"> 
       {props.Data.map((obj, index) => {
            const videoID = obj["url"].split("=")[1];
            const rating = obj["rating"];
            const videoTitle = obj["title"];      
       return (    
     <div key = {index}>         
        <OneVideoFrame videoID = {videoID} rating = {rating} videoTitle = {videoTitle} index = {index} handleDelete = {props.handleDelete} />        
     </div>
        ) } )}
        </div>
            )
       
        }    
    ;
export default VideoFrames;