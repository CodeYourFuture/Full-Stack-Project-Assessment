import "./App.css";
import videosData from "./exampleresponse.json";
import Videos from "./components/Videos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Videos videosData={videosData} />
    </div>
  );
}

export default App;
