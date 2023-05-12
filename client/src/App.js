import { AddVideo } from "./AddVideo";
import "./App.css";
import { VideosCards } from "./VideosCards";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/index.html" alt="Play button animation" className="play-btn">
          .
        </a>
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo />
      <VideosCards />
    </div>
  );
}

export default App;
