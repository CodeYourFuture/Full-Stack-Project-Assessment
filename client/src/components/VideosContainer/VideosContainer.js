import React from 'react'
import Videos from "../../components/Videos/Videos";

import "./VideosContainer.css";

function VideosContainer({videoData,deleteVideo }) {
    return (
 
        <div className="main-videos">  
               {videoData.map((video,index) => (
               <Videos

                key={index} 
                video={video}        
                deleteVideo={deleteVideo}/>))}
                   

                  
                 
                     

        </div>
        
    );
}

export default VideosContainer
