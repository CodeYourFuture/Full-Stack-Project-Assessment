import React from "react";
import { useGlobalContext } from "../Context"
import ReactPlayer from "react-player"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Video = () => {
    const { data } = useGlobalContext();
    console.log(data);
    return (
        <div>
            {data.map(element => {
                const { id, title, url, rating } = element
                return (
                    <li key={id} className="media">
                        <ReactPlayer url={url}/>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1">{title}</h5>
                            <p>
                                <FaThumbsDown />
                                {rating}
                                <FaThumbsUp />
                            </p>
                        </div>
                    </li>
                )
            })}

        </div>
    )
}

export default Video;