import React from "react";
import Votes from "./Votes";

function Video(props ) {
const handleDelete = () => {
    props.delete(props.videoId);
};

return(
    <div className="Video-card">
        <ul className="Card-List">

    <li>
        <h4> {props.title}</h4>
    </li>
    <li>
        <Votes />
    </li>
    <li>
        <h6>Rating: {props.rating}</h6>
    </li>
    <li>
        <iframe
        width="560"
        height="315"
        src={props.Url}
        title={props.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen>
        </iframe>
    </li>
    <li>
        <button
        onClick={handleDelete}
        type="button"
        className="btn btn-outline-danger video-del-btn">
            Delete Video
        </button>
    </li>
    </ul>
                </div>
    );
}




export default Video;