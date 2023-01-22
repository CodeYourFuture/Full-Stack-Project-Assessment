import { React, useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import Nav from './components/Nav.jsx'
// import {
//   BrowserRouter as Router, Switch,
//   Route, Redirect,
// } from "react-router-dom";


// // // import Add video component
import Add from "./components/Add";


function App() {

  let [data, setVideo] = useState(dataVideos)

  function deleteBtn(id) {
    console.log(id)
    setVideo((data) => data.filter((video) => video.id !== id));
    console.log(data.length)
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

  let state = {
    videos: [],
  }

  let [states, SetStates] = useState({
    title: '',
    url: '',
  })

  let handleChange = (e) => {
    SetStates({ [e.target.name]: e.target.value });
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    // this.props.addVideoToList(state);

    SetStates({ title: '', url: '' });

    console.log(states)
  }


  return (
    <div>
      <Nav />
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        {data.map((video, key) => (
          <Video video={video} key={key} deletes={deleteBtn} votes={voter} />
        ))}
      </body>
      <Add handleC={handleChange} handleS={handleSubmit} state={states} />

    </div>
  );
}

export default App;
