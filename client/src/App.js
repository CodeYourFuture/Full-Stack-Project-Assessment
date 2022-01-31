import "./App.css";
import VideoComponent from "./components/VideoComponent/VideoComponent";

import videoData from "./exampleresponse.json";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className= 'pageHeading'>Video Recommendation</h1>
      </header>
      <VideoComponent
        videoId={videoData[0].url.split("v=")[1].substring(0, 11)}
        videoTitle={videoData[0].title}
        videoRating={videoData[0].rating}
      />
    </div>
  );
}

export default App;
