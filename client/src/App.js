import "./App.css";

import VideosList from "./components/VideosList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <VideosList />
    </div>
  );
}

export default App;
