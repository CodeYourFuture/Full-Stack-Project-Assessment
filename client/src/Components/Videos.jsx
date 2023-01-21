import React from "react";
import { useState } from "react";
import SingleVideo from "./SingleVideo";
import Votes from "./Votes";

function Videos(props) {
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
           <SingleVideo id = {id}/>
            <button id={key} onClick={handleDelete}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Videos;
