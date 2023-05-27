import "./App.css";
import VideoCards from "./VideoCards";
import { VoteUpDown } from "./VoteUpDown";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <form >
          <label>
            <input type="text" name="title" placeholder="Title"/>
            <input type="text" name="link" placeholder="Link"/>
          </label>
          <input type="submit" value="Add" />
        </form>
        <VideoCards />
      </header>
    </div>
  );
}

export default App;
