import React, { useState, useEffect } from "react";
import Package from "../data/exampleresponse.json";
import ReactPlayers from "./ReactPlayers";
//import axios from "./axios";

const TheVideos = () => {
  //const [allVoted, setAllVoted] = useState(0);

   const [videos, setVideos] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/")
  .then(res => res.json())
  .then(data => 
    console.log(data)
  )
  .catch((error) => {
    console.log("this is rerror" + error);
  })
},[]) 
const handlClick = () => {
  setVideos(videos + 1);
}

  return (
    <span>
      {Package.map((lik, i) => {
        return (
          <div className="allVideos" key={i}>
            <h2>{lik.title}</h2>
            <p>{lik.id}    "      {lik.rating}</p>
            
              <button id="local"
                onClick={handlClick}
                type="button"
                class="btn btn-primary"
              >            like{" "}  : {videos}
              </button>
            
            <ReactPlayers url={lik.url} />
          </div>
        );
      })}
    </span>
  );
};

export default TheVideos;
