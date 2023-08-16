import React from "react";

// add onClick for upvote and downvote
export default function VideoCard(props) {
  return (
    <div className="video--card">
      <h1>{props.title}</h1>
      <p>{props.url}</p>
      <p>{props.rating}</p>
    </div>
  );
}
