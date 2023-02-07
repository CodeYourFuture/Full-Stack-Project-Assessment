import React, { useState } from "react"; //use to array
import YoutubeVideo from "./YoutubeVideo";
import exampleresponse from "../exampleresponse.json";


const ListVideo=()=>{

  const [videosYoutube,setVideosYoutube]=useState(exampleresponse)

    const increasementVote=(id)=>{
      setVideosYoutube(videos=>{
      videos.map(video=>{
        if(video.id===id){
          return {...video,rating: video.rating+1}
        }
        return video;
      })
    })
  }

  const decreasementVote=(id)=>{
    setVideosYoutube(videos=>{
      videos.map(video=>{
        if(video.id===id){
          return{...video,rating:video.rating-1}
        }
        return video;
      })
    })
  }

  const removeVideo=id=>{
    setVideosYoutube(videos=>videos.filter(video=>video.id!==id));
  }

  videosYoutube.sort((a, b) => b.rating - a.rating);

     return (
       <div className="video-list">
         {videosYoutube.map((video) => (
           <YoutubeVideo
             key={video.id}
             video={video}
             increasementVote={() => increasementVote(video.id)}
             decreasementVote={() => decreasementVote(video.id)}
             removeVideo={() => removeVideo(video.id)}
           />
         ))}
       </div>
     )

}



export default ListVideo;