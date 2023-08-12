import "./App.css";
import AddVideo from "./AddVideo";
import VideoCards from "./VideoCards";
import Search from "./Search.js";

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
