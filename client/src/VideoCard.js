import React from "react";
import Votes from "./Votes";
import "./VideoCard.css";
// import videosData from "./exampleresponse.json"

function VideoCard({videos,setVideos}) {
    // const [videos, setVideos] = useState (videosData)
    const removeVideo = (id) =>{
        let newVideoList = videos.filter((video) => video.id !==id);
        setVideos(newVideoList);
      }

    return (
      
        <div className="card">
            {videos.map((video, index) => {
              return  (<div className ="card-body">
              <iframe title={video.title} width="420" height="315" src={video.url}>
              </iframe>
              <Votes/>
              <button className="btn btn-default" onClick={() => removeVideo(video.id)}>DELETE</button>
              
          </div> ) 
            })}
           
           
        </div> 
    )
}
export default VideoCard;

