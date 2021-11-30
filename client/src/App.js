import "./App.css";
import data from "./exampleresponse.json";
import VideoCard from "./componenets/VideoCard";

const videos = data;

data.map((dat) => console.log(dat.url));

function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header" style={{ marginBottom: "50px" }}>
          <h1>Video Recommendation</h1>
        </header>
        <VideoCard videos={videos} />
      </div>
      <div></div>
    </div>
  );
}

export default App;
