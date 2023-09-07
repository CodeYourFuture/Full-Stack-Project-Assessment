import "./App.css";
import videoData from "./exampleresponse.json";
import Videocard from "./components/Videocard";

console.log(videoData);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Videocard />
    </div>
  );
}

export default App;
