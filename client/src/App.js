import "./App.css";
import "./Components/VideoList";
import VideoList from "./Components/VideoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <>
          <VideoList />
          <form action="../../post" method="post" className="form">
            <button type="submit">Connected?</button>
          </form>
        </>
      </header>
    </div>
  );
}

export default App;
