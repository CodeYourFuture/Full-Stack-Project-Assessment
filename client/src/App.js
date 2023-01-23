<<<<<<< HEAD
import { useState } from "react";
import React from "react";
=======
import { React, useState } from "react";
>>>>>>> 27e0169 (Updated Course Work with new Navbar)
import "./App.css";
import Video from "./Video";
// import FormDisabled from "./commponets/FormDisabled";
import dataVideos from "./exampleresponse.json";
import Nav from './components/Nav.jsx'

function App() {
<<<<<<< HEAD
=======

>>>>>>> 27e0169 (Updated Course Work with new Navbar)
  let [data, setVideo] = useState(dataVideos)

  function deleteBtn(id) {
    console.log(id)
    setVideo((data) => data.filter((video) => video.id !== id));
<<<<<<< HEAD
=======
    console.log(data.length)
>>>>>>> 27e0169 (Updated Course Work with new Navbar)
  }



  function voter(votes, id) {
    setVideo((data) => data.map((video) => {
      if (video.id === id) {
        video.rating = votes;
      }
      return video;
    })
    );
    console.log(data);
  }

  function addVideo(newVid) {
    console.log("I got here", newVid);
    setVideo((videoData) => videoData.concat(newVid));
  }

<<<<<<< HEAD

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>
=======
  return (
    <div>
      <Nav />
      <body>
>>>>>>> 27e0169 (Updated Course Work with new Navbar)
        {data.map((video, key) => (
          <Video video={video} key={key} deletes={deleteBtn} votes={voter} />
        ))}
      </div>
    </div>
  );
}

export default App;
