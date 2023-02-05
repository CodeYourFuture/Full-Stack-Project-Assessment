import React from "react";
import Video from "./Video";

const VideoList=({videos,upVote,downVote,removeVideo})=>{
    videos.sort((a, b) => b.rating - a.rating);

     return videos ? (
       <div className="video-list">
         {videos.map((video) => (
           <Video
             key={video.id}
             video={video}
             upVote={() => upVote(video.id)}
             downVote={() => downVote(video.id)}
             removeVideo={() => removeVideo(video.id)}
           />
         ))}
       </div>
     ) : (
       <p>No videos found</p>
     );;
  
}

export default VideoList;




