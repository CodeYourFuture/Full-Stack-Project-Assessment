import "./App.css";
import AddVideo from "./components/AddVideo";
import VideoList from "./components/VideoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo/>
      <VideoList />
    </div>
  );
}
export default App;