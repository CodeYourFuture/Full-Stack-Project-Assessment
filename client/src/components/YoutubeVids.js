import React, { useState } from "react";
import vidsData from "../vidsData.json"


const YoutubeV= () => {
  const [filterVids, setFilterVids] = useState(vidsData);
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter((counter) => counter + 1);
  }

  function decrement() {
    setCounter((counter) => counter - 1);
  }

  function deleteVideo(filterVid) {
    filterVids.filter((i) => i !== filterVid.id);
  }

  return (
    <div className="main-container">
      {filterVids.map((filterVid) => (
        <div className="cards">
          <h3>{filterVid.title}</h3>
          <div className="vote-for-video">
            <i className="fa fa-thumbs-o-up upVotes" onClick={increment}></i>
            <p>{counter} Votes</p>
            <i
              className="fa fa-thumbs-o-down downVotes"
              onClick={decrement}
            ></i>
          </div>
          <iframe
            width="560"
            height="315"
            src={filterVid.url.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={deleteVideo}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default YoutubeV;
