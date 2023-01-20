import "./App.css";
import Video from "./Components/Video";

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

       <Video></Video>


      </header>
    </div>
  );
}

export default App;
