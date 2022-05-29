import "./App.css";
import exampleresponse from "./exampleresponse.json";

function Video() {
  const videoData = exampleresponse.map((item) => {
    return (
      <div className="video-container">
        <h2>{item.title}</h2>
        <video src={item.url} alt={""} />
        <div className="votes">
          <p>{item.rating}</p>
          <p>up-vote icon</p>
          <p>down-vote icon</p>
        </div>
        <button>button to remove video</button>
      </div>
    );
  });
  return <>{videoData}</>;
}

function AddVideo() {
  return (
    <div className="add-video-container">
      <p>title</p>
      <p>url</p>
      <button>cancel</button>
      <button>add</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <AddVideo />
        <Video />
      </main>
    </div>
  );
}

export default App;
