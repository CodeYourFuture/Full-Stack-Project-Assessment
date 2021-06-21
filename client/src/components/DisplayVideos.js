import React, { useState } from "react";

function DisplayVideos(props) {

    const [display, setDisplay] = useState(true);
    const [value, setValue] = useState(props.video.rating);

    function removeVideo() {
        setDisplay(false);
    }

    function handleUpVote() {
        setValue(value + 1)
    }

    function handleDownVote() {
        setValue(value - 1)
    }

    if (props.video) {
        return (
            display &&
            <div className="video-container">
                <h2 className="video-title">{props.video.title}</h2>
                <div className="voting-score-container">
                    <button type="button" className="up-vote" aria-label="thumbs-up" onClick={handleUpVote}><i className="fas fa-thumbs-up fa-3x"></i></button>
                    <p className="voting-score-text">{value}</p>
                    <button type="button" className="down-vote" aria-label="thumbs-down" onClick={handleDownVote}><i className="fas fa-thumbs-down fa-3x"></i></button>
                </div>
                <iframe width="560" height="315" src={`${props.video.url.replace("watch?v=", "embed/")}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <button type="button" className="remove-button" onClick={removeVideo}>Remove Video</button>
            </div>
        );
    } else {
        return null
    }
}

export default DisplayVideos;