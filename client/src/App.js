import "./App.css";
import Video from "./components/Video";
import Search from "./components/Search";
import ItemVideo from "./components/ItemVideo";
import data from "./exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="input-section">
        <Video />
        <Search />
      </div>
      <div className="video-list">
        {data.map((video) => {
          return <ItemVideo key={video.id} {...video} />;
        })}
      </div>
    </div>
  );
}

export default App;
