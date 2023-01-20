import "./App.css";
import { FaRegThumbsUp, FaThumbsDown } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>

        <button>Add Video</button>
        <div>
          <label for="search">Search</label>
          <input type="search" id="search" />
        </div>

        <div>
          <label for="title">Title</label>
          <input type="text" />

          <label for="url">URL</label>
          <input type="text" />

          <button>Cancel</button>
          <button>Add</button>
        </div>

        <div>
          <div>
            <FaRegThumbsUp></FaRegThumbsUp>
            <FaThumbsDown></FaThumbsDown>
          </div>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </header>
    </div>
  );
}

export default App;
