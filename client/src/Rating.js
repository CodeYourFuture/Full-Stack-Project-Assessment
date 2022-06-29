import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Rating = (props) => {

    const [rate, setRate] = useState(props.rating);

    function increase() {
        setRate((rate) => rate + 1);

    };

    function decrease() {
        setRate((rate) => rate - 1);


    };
    
    useEffect(() => {
        let data = { rating: rate, id: props.id };
        fetch(("http://localhost:5000/videos"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data1) => {
                console.log(data1)
            })
            .catch((error) => {
                console.log(error)
            });

    }, [rate, props.id])


    return (
        <div className="rating">
            <button className="vote-button" onClick={(event) => decrease()}>
                <FontAwesomeIcon className="icon" icon={faHeartBroken} size="sm" />
            </button>
            {rate} Votes
            <button className="vote-button" onClick={(event) => increase()}>
                <FontAwesomeIcon className="icon" icon={faHeart} size="sm" />

            </button>
        </div>
    );
};
export default Rating;