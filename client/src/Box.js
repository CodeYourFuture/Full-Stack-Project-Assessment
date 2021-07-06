import React, { useState } from "react";
import IFrame from "./Iframe";

const Box = (props) => {
    const [isBoxSelected, setIsBoxSelected] = useState(true);
    const [rating, setRating] = useState(props.rating);

    return (
      <div className={isBoxSelected ? "box" : "delete"}>
        Title: {props.title}
        <br></br>
        <IFrame embed={props.embed} />
        <br></br>
        ID: {props.id}
        <br></br>
        <button onClick={() => setRating(rating + 1)}>👍</button>
        Rating: {rating} 
        <button onClick={() => setRating(rating - 1)}>👎</button>
        <br></br>
        <button onClick={() => setIsBoxSelected(!isBoxSelected)}>Delete</button>
      </div>
    );
}
export default Box;