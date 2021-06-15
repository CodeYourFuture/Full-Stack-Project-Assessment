import React from "react";
import { useGlobalContext } from "../context";
import ReactPlayer from "react-player"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
const Video = () => {
    const { data } = useGlobalContext();
    console.log(data)
    return(
        <div>
            {data.map((video) => {
                const { id, title, url, rating } = video;
                return(
                <li className="media" key={id}>
                    {/* <iframe width="560" height="315"
                     src={url} 
                     title="YouTube video player" 
                     frameBorder="0" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                     allowFullScreen></iframe> */}
                     <ReactPlayer 
                     width='30%'
                     height='100%'
                     url={url}/>
                    <div className="media-body">
                    <h5 className="mt-0 mb-1">{title}</h5>
                    <p>
                    <FaThumbsDown/>    
                     {rating}
                     <FaThumbsUp />    
                    </p>
                    </div>
                </li>

                )
            })}
        </div>
    )
};

export default Video;