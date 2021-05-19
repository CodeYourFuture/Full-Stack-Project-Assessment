import "./App.css";
import YouTubeVideoAdder from "./components/VideoAdder";
import YouTubeVideosContainer from "./components/VideoCards";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <YouTubeVideoAdder />
        <YouTubeVideosContainer />
      </div>
    </div>
  );
}

export default App;
