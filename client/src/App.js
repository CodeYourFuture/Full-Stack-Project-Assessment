import "./App.css";
import SearchBar from "./SearchBar.js";
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo />
      <VideoCard />
      <SearchBar />
    </div>
  );
}

export default App;
