import "./App.css";
import UpVote from "./components/Upvote";
import Downvote from "./components/Downvote";
import Video from "./components/Videos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Video />
        {/* <UpVote /> */}
        {/* <Downvote /> */}
      </header>
    </div>
  );
}

export default App;
