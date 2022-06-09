import "./App.css";
import videosData from "./exampleresponse.json"
import VideoCard from "./VideoCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <VideoCard data={videosData}/>
    </div>
  );
}

export default App;
