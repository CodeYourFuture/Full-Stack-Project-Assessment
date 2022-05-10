import React, { useState } from "react";
import Package from "../data/exampleresponse.json";
import OrderResult from "./OrderResult";
import ReactPlayers from "./ReactPlayers";
import NewVideos from "./NewVideos";

const TheVideos = ({ lik }) => {
  const [allVoted, setAllVoted] = useState(0);

  const [videos, setVideos] = useState("");
  
  const handleVote = () => {
    console.log(setAllVoted);
    setAllVoted(allVoted + 1);
  };

  return (
    <div className="div2">
      <OrderResult/>
      <label id="search">
        <input
          id="search"
          name="search"
          value={videos}
          placeholder="search you video"
          onChange={(e) => setVideos(e.target.value)}
        />
      </label>
      {Package.filter((val) => {
        if (allVoted === "") {
          return val;
        } else if (val.title.toLowerCase().indexOf(videos) > -1) {
          return val;
        }else{
          return null;
        }
        }).map((lik, i) => {
        return (
          <div className="allVideos" key={i}>
            <h2>{lik.title}</h2>
            <p>
              {" "}
              {lik.id} " {lik.rating}
            </p>
            <button
              id="clickButton"
              onClick={handleVote}
              type="button"
              className="btn btn-primary"
            >
              {" "}
              like{""}:{allVoted}
            </button>    
            <ReactPlayers   orl={lik.url} />
          
            <div className="firstP">  {<NewVideos />} </div>
               </div>
               
           );
         })}  
         
      </div>
  );};

export default TheVideos;
