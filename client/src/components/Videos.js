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
        <div className="main-container" >
            <div className="cards" >
                <p display="flex" flex-wrap="wrap">{props.title}</p>
                <div className>
                    <ReactPlayer width="355px" height="200px"
                        url={props.url} />
                </div>
                <br />
                <div className="thumbs-icons">

                    <button className="fa-regular fa-thumbs-up" onClick={increaseVotes}> +</button>
                    <p>{parseInt(props.rating) + votes}</p>
                    <button className="fa-regular fa-thumbs-down" onClick={() => decreaseVotes(parseInt(props.rating))}> - </button>
                </div>

                <button type="button" className="btn btn-primary">
                    Delete
                </button>

            </div>
        </div>
    );
}