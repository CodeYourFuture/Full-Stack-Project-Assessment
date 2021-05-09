import "./App.css";
import Card from "./components/VideoCard";
import youTubeVideos from "./data/exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        {youTubeVideos.map((video, index) => (
          <Card key={index} data={video} />
        ))}
      </div>
    </div>
  );
}

export default App;
