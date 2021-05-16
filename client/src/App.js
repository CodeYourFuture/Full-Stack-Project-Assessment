import "./App.css";
import DeleteVideo from "./DeleteVideo";
import exampleResource from "./exampleResponse.json";
import Video from "./Video";

function App() {
  const videoData = exampleResource;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videoData.map((video, index) => (
        <div key={index}>
          <Video url={video.url} videoTitle={video.title} />
          <p>Rating: {video.rating}</p>
          <DeleteVideo />
        </div>
      ))}
    </div>
  );
}

export default App;
