import React, { useState } from "react";
import IFrame from "./Iframe";

const Box = (props) => {
    // const [isBoxSelected, setIsBoxSelected] = useState(true);
    const [rating, setRating] = useState(props.rating);
    return (
      <div className="box">
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
        <button onClick={() => props.setArray(props.array.filter(x=>x.id!==props.id))}>Delete</button>
      </div>
    );
}
export default Box;