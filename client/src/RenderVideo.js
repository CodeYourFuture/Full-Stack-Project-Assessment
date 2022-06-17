import React from "react";
import Rating from "./Rating";

const RenderVideos = (props) => {
    return ( 
        <div className = "video-card">
            {props.filterVideo.map((video)=>{
                const videoId = video.url.substring(video.url.indexOf("=") + 1);
                return(
                    <div key={video.id}>
                     <p className="title">{video.title}</p>
                        <div>
                            <Rating rating={video.rating} id={video.id} key={video.id}/>                            
                      <iframe
                                width="360"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default RenderVideos;
