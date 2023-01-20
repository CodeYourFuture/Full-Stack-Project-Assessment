import React from "react";
import { useState } from "react";
import Votes from "./Votes";

function Video(props) {
  function handleDelete(e) {
    let result = props.copyData.filter((el, index) => {
      return index !== +e.target.id;
    });
    props.setCopyData(result);
  }

  return (
    <div>
      {props.copyData.map((el, key) => {
        let index = el.url.indexOf("=");
        let id = el.url.slice(index + 1);
        return (
          <div key={key}>
            <p>{el.title}</p>
            <Votes />
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button id={key} onClick={handleDelete}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Video;
