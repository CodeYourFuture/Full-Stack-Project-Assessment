import React, { useEffect } from "react";
import { useState } from "react";
import SingleVideo from "./SingleVideo";
import Votes from "./Votes";
import axios from "axios";

function Videos(props) {
  function handleDelete(e) {
    axios.delete(`/videos/${e.target.id}`);
    props.setTracker((el) => el + 1)
  }

  return (
    <div>
      {props.data.map((el, key) => {
        let index = el.url.indexOf("=");
        let id = el.url.slice(index + 1);
        return (
          <div key={key}>
            <p>{el.title}</p>
            <Votes />
            <SingleVideo id={id} />
            <button id={el.id} onClick={handleDelete}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Videos;
