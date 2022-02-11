import React from "react";
import aretha from './images/aretha.jpg'
import otisredding from "./images/otisredding.jpg";


function Jumbotron() {
  return (
    <div className="jumbotron">
      <div className="title-images">
        <div>
          <img alt="soul singer aretha franklin" src={aretha} />
        </div>
        <h1>🎺 The Greatest Soul Songs of All Time 🎺</h1>
        <div>
          <img alt="soul singer otsi redding" src={otisredding} />
        </div>
        </div>
        <p>
          Help the internet find the greatest soul song, for the love of music.
        </p>
        <p>Browse the videos in the list and vote.</p>
        <p>Add your own amazing Soul Song to the list, to be voted on.</p>
      </div>
    
  );
}

export default Jumbotron;
