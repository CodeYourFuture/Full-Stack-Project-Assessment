import React from "react";
import Votes from "./Votes";
import Video from "./Video"

import "../App.css";

function Content({ data, wordEntered, handleDelete }) {

  return (
    <div className="videos row">
      {data
        .filter((val) => {
          if (wordEntered === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(wordEntered.toLowerCase())
          ) {
            return val;
          }
          return null;
        })
        .map((item, key) => {
          return (
            <div className="col-md-4 pb-2 mb-5" key={item.id}>
              <h5>{item.title}</h5>
              <Votes data={item.rating} />
              <div className="video">
                <Video embedId={item.url}/>
              </div>
              <button
                type="button"
                className="removeVideo btn btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Content;
