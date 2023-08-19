import React from "react";

export default function Rating(props) {
  return (
    <div>
      <button>Add</button>
      <span>Rating: {props.rating}</span>
      <button>Remove</button>
    </div>
  );
}
