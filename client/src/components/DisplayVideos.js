import React, { useState } from "react";

function DisplayVideos(props) {

    const [value, setValue] = useState(props.video.rating);

    function removeVideo() {
        fetch(`https://nameless-stream-61236.herokuapp.com/${props.video.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
    }

    function handleUpVote() {
        let newValue = { rating: value + 1 };
        fetch(`https://nameless-stream-61236.herokuapp.com/${props.video.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newValue),
        })
        setValue(value + 1)
    }

    function handleDownVote() {
        let newValue = { rating: value - 1 };
        fetch(`https://nameless-stream-61236.herokuapp.com/${props.video.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newValue),
        })
        setValue(value - 1)
    }

    if (props.video) {
        return (
            <div className="col-md-6">
                <div className="video-container">
                    <h2 className="video-title">{props.video.title}</h2>
                    <div className="voting-score-container">
                        <button type="button" className="up-vote" aria-label="thumbs-up" onClick={handleUpVote}><i className="fas fa-thumbs-up"></i></button>
                        <p className="voting-score">{value}</p>
                        <button type="button" className="down-vote" aria-label="thumbs-down" onClick={handleDownVote}><i className="fas fa-thumbs-down"></i></button>
                    </div>
                    <div className="embed-responsive embed-responsive-16by9 video-content">
                        <iframe className="embed-responsive-item" src={`${props.video.url.replace("watch?v=", "embed/")}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <button type="button" className="btn btn-danger remove-button" onClick={removeVideo}>Remove Video</button>
                </div>
            </div>
        );
    } else {
        return null
    }
}

export default DisplayVideos;