import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import "./comp.css";


export const Videos = (props) => {


    const [votes, setVotes] = useState(0);


    const increaseVotes = () => {
        setVotes(votes + 1);
    };
    const decreaseVotes = (ratings) => {
        if (ratings + votes > 0) {
            setVotes(votes - 1);
        }
    };
    return (
        <div className="video-container">
            <div className="video">
                <p>{props.title}</p>
                <ReactPlayer
                    url={props.url}
                />
                <div className="thumbs-icons">
                    <p>{parseInt(props.rating) + votes}</p>
                    <button className="fa-regular fa-thumbs-up" onClick={increaseVotes}> +</button>
                    <button className="fa-regular fa-thumbs-down" onClick={() => decreaseVotes(parseInt(props.rating))}> - </button>
                </div>
            </div>
            <button type="button" className="btn btn-primary">
                Delete
            </button>
        </div>
    );
}