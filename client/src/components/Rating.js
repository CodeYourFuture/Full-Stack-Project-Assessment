import React from "react";

export default function Rating(props) {
  console.log(props);
  return (
    <div>
      <button onClick={() => props.handleClickAdd(props.id)}>Add</button>
      <span>Rating: {props.rating}</span>
      <button onClick={() => props.handleClickMinus(props.id)}>Minus</button>
    </div>
  );
}
