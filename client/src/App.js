import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "./App.css";
import InsertVideo from "./InsertVideo";
// import video from "./singleVideo.json";
import defaultVideos from "./exampleresponse.json";

function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState('');
  // const [rating, setRating] = useState(0);

  const addVideo = (event) => {
    event.preventDefault();
    let id = Math.max(...defaultVideos.map(v => v.id)) + 1;
    setTitle(event.target.value);
    setUrl(event.target.value);
    const rating = 0;

    function isUrlValid(url){
      if(url){
        var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(regExp)) {
          return true;
          }
      }
      return false;
    }

    if(title.length === 0){
      alert("You need to enter the video title");
    }else if(!isUrlValid){
      alert("Please enter a valid YouTube URL");
    }

    let newVideo = {
      id: id,
      title: title,
      url: url,
      rating: rating
    }
    console.log("A video is successfully added!")
    // defaultVideos.push(newVideo);
  }

  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="upper-div">
          <button className="add-video-btn">Add Video</button>
          <div className="add-form">
            <form onSubmit={addVideo}>
              <label>Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter Video Title"
                onChange={(event) => setTitle(event.target.value)}
              ></input>
              <label>URL</label>
              <input
                type="text"
                id="videolink"
                placeholder="Enter the URL"
                onChange={(event) => setUrl(event.target.value)}
              ></input>
              <button className="add-btn" >
                ADD
              </button>
              <button className="cancel-btn">Cancel</button>
            </form>
          </div>
          {/* <div className="add-cancel-buttons"> */}
          {/* </div> */}
        </div>
        <hr className="hr"></hr>
        <div className="search-video">
          <label>Search</label>
          <input></input>
        </div>
        <div className="all-videos">
          {defaultVideos.map((video, key) => (
            <InsertVideo video={video} key={key} />
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
