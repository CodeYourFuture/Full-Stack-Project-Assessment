import "./App.css";
import VideoContents from "./components/VideoContents";
import { VideoProvider } from "./contexts/VideoContext";
import SearchVideo from "./components/SearchVideo";

function App() {
  return (
    <VideoProvider>
      <div className="App">
        <header className="App-header row justify-content-center">
          <div className="col-10 col-md-8 p-3">
            <h1>Video Recommendation</h1>
          </div>
          <div className="col-10 col-md-3 p-3">
            <SearchVideo />
          </div>
        </header>
        <VideoContents />
      </div>
    </VideoProvider>
  );
}

export default App;
