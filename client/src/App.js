import "./App.css";
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";
import Search from "./Search.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddVideo />
      <VideoCard />
      <Search />
    </div>
  );
}

export default App;
