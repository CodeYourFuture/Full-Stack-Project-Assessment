import "./App.css";
import VideoList from "./components/VideoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-flicker-in-glow">Video Recommendation</h1>
        <>
          <VideoList />
        </>
      </header>
    </div>
  );
}

export default App;
