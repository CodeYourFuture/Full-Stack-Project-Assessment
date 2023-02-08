import "./App.css";
import VideoCards from "./VideoCards";
import AddVideo from "./AddVideo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo />
      <VideoCards />
    </div>
  );
}

export default App;
