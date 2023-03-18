import "./App.css";
import AddVideo from "./components/AddVideo";
import Video from "./components/Video.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo/>
      <Video />
    </div>
  );
}
export default App;