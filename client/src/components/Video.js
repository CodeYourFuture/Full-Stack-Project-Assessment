import React, { useState } from "react";

const Video = ({ video, handleDelete}) => {
    const [counter, setCounter] = useState(video.rating);
    const [isLiked, setIsLiked] = useState(false);

    const likes = () => {
        setCounter(counter + 1);
        setIsLiked(true);
    }

    const dislikes = () => {
        setCounter(counter - 1);
        setIsLiked(false);
    }

    return (
        <div className="video">
            <div className="video-info">
                <h4>{video.title}</h4>
               
         <div className="vote d-flex justify-content-center">
          <i className="fa fa-thumbs-o-up thumps" onClick={() => likes()}></i>
          <h5 className="mx-3">{counter}Like</h5>
          <i 
            className="fa fa-thumbs-o-down thumps"
            onClick={() => dislikes()}
            ></i>
        </div>
            </div>

            <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
            title="Metube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>

            <div className="delete d-flex justify-content-center">
                <button
                onClick={() => handleDelete(video.id)}
                className="btn btn-danger"
                >
                Delete
                </button>
            </div>
        </div>
    );
};


export default Video;


                