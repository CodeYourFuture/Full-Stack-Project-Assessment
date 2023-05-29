import "./App.css";
import VideoCards from "./VideoCards";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Header />
        <VideoCards />
      </header>
    </div>
  );
}

export default App;
