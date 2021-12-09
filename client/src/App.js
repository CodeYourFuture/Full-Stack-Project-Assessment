import "./App.css";
import Video from "./Video";
import data from "./exampleresponse.json";

function App() {
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Video />
      </header>
    </div>
  );
}

export default App;
