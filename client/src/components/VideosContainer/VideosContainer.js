import React from 'react'
import Videos from "../../components/Videos/Videos";
import "./VideosContainer.css";

function VideosContainer({videoData,deleteVideo,search}) {

    const sortedData = videoData.sort((video1, video2) => (video2.rating) - (video1.rating))
    .filter((video) => video.title.toUpperCase().includes(search.toUpperCase()));

    return (
        
        <div className="main-videos">     
               {sortedData.map((video,index) => (
               <Videos
                    key={index} 
                    video={video}
                    deleteVideo={deleteVideo}/>))}
        </div>
    );
}

export default VideosContainer
