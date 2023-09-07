import "./App.css";
import videoData from "./exampleresponse.json";
import Videocard from "./components/Videocard";
import UrlLinks from "./components/url";

console.log(videoData);

function App() {

  const videoElements = videoData.map((video) => {
    return <Videocard name={video.title} />;
  })

const youTubeLinks = videoData.map((video) => {
  return <url link={links.url} />
})

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>{videoElements}</div>
      
    </div>
  );
}

export default App;
