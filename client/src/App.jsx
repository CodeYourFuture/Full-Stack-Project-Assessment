import "./App.css";
import Input from "./AddVideo";
import VideoPage from "./VideoPage";
import AddVideo from "./AddVideo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo label = "add video"/>
      <AddVideo label = "add url"/>
      <VideoPage />
    </div>
  );
}

export default App


