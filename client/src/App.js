import "./App.css";
//import AllButtons from "./components/AllButtons";
import ShowVideos from "./components/Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <ShowVideos />
      </header>
    </div>
  );
}

export default App;
