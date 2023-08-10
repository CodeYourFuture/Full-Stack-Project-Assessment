import "./App.css";
import Search from "./Search.js";
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
      <Search />
    </div>
  );
}

export default App;
