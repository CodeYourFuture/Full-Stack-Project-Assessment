import "./App.css";
import VideoUi from "./VideoUi";
import * as data from "./exampleresponse.json";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>


      <VideoUi />
    </div>
  );
}

export default App;
