import React, { useState} from "react";
import vidsData from "./vidsData.json";
import AddVids from "./AddVids";



const YoutubeV = () => {
  console.log(vidsData)
  const [filterVids, setFilterVids] = useState(vidsData);
  const [counter, setCounter] = useState(0);

  // counter
  function increment() {
    setCounter((counter) => counter + 1);
  }

  function decrement() {
    setCounter((counter) => counter - 1);
  }

  //delete video
  function deleteVideo(filterVid) {
    let newList = filterVids.filter((i) => i.id !== filterVid.id);
    setFilterVids(newList);
  }
  //Add new Video
  function addVideo(newVid) {
    let newVids = [...filterVids, newVid];
    setFilterVids(newVids);
  }

  return (
    <div className="main-container">
      <AddVids addVideo={addVideo} />
      {filterVids.map((filterVid) => (
        <div className="cards">
          <h3>{filterVid.title}</h3>
          <div className="vote-for-video">
            <button className="upVote" onClick={increment}>
              LIKE
            </button>
            <p>{counter} Votes</p>
            <button className="downVote" onClick={decrement}>
              DISLIKE
            </button>
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
          <button onClick={() => deleteVideo(filterVid)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default YoutubeV;
