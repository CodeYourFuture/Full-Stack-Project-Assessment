import {React} from 'react';
import "../App.css";
import OneVideoFrame from './oneVideoFrame';


const VideoFrames = (props) => {
  console.log(props.Data)
    function sortAllVideos(allVideos) {
        allVideos.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          } else {
            return 1;
          }
        });
      }

    return (    
          <div className = "videoframes"> 
          {/* {sortAllVideos(props.Data)} */}
          {props.Data.map((obj, index) => {
            
            const videoID = obj["url"].split("=")[1];
            const rating = obj["rating"];
            const videoTitle = obj["title"];      
       return (    
     <div key = {index}>         
        <OneVideoFrame videoID = {videoID} 
        rating = {rating} 
        videoTitle = {videoTitle} 
        index = {index} 
        setDisplayVideos = {props.setDisplayVideos} 
        allVideos = {props.allVideos} />        
     </div>
        ) } )}
        </div>
            )
       
        }    
    ;
export default VideoFrames;