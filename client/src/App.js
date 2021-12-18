import "./App.css";
import LoadVideos from "./Components/LoadVideos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="websiteTitle">Video Recommendation</h1>
      </header>
      <LoadVideos />
    </div>
  );
}

export default App;
