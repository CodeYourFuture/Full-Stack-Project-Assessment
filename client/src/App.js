import "./App.css";
import AddVideo from "./AddVideo";
import VideoCards from "./VideoCards";
import SearchBar from "./SearchBar.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo />
      <VideoCards />
      <SearchBar />
    </div>
  );
}

export default App;
