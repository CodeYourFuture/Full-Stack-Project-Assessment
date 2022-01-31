import "./App.css";
import VideoComponent from "./components/VideoComponent/VideoComponent";

import videoData from "./exampleresponse.json";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='pageHeading'>Video Recommendation</h1>
      </header>
      <div>
        {videoData.map((video, index) => (
          <VideoComponent
            key={index}
            videoId={video.url.split("v=")[1].substring(0, 11)}
            videoTitle={video.title}
            videoRating={video.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
