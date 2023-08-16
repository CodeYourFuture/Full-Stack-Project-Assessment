import React from "react";

export default function VideoCard(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.url}</p>
      <p>{props.rating}</p>
    </div>
  );
}
