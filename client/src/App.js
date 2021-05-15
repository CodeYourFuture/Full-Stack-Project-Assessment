import { useState } from "react";
import "./App.css";
import YouTubeVideoCard from "./components/VideoCard";
import youTubeVideos from "./data/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(youTubeVideos);
  // EVENT HANDLERS
  const addNewVideo = (event) => {
    event.preventDefault()
    const form = event.target;
    const newVideo = {
      id: videos.length,
      title: form.querySelector("#title").value,
      url: form.querySelector("#url").value,
    };
    setVideos([...videos, newVideo]);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <div class="form-container">
          <h2 className="form-title">Add Video</h2>
          <form id="form-add" onSubmit={addNewVideo}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title"></input>
            <label htmlFor="url">URL: </label>
            <input type="text" id="url" name="url"></input>
            <button type="submit" id="add">
              Add
            </button>
          </form>
        </div>
        <div className="cards-container">
          {videos.map((video, index) => (
            <YouTubeVideoCard key={index} data={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;