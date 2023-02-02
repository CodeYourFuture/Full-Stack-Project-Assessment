import React from "react";
import EmbeddedVideo from "./EmbeddedVideo";
import DeleteBtn from "./DeleteBtn";
import VoteButtons from "./VoteButtons";

function Video(props) {
  return (
    <div className="video-container">
      <h5>{props.video.title}</h5>
      <EmbeddedVideo url={props.video.url} title={props.video.title} />
      <div className="buttons">
        <VoteButtons id={props.video.id} rating={props.video.rating}/>
        <i>{props.video.date ? `Uploaded at : ${props.video.date}` : ""}</i>
        <DeleteBtn handleDelete={() => props.handleDelete(props.video.id)} />
      </div>
    </div>
  );
}

export default Video;
