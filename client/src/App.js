import "./App.css";
import TheVideos from"./components/TheVideos.js";
import EmbedVideos from "./components/EmbedVideos.js";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <TheVideos />
     <EmbedVideos/> 
  
    </div>
  );
}

export default App;
