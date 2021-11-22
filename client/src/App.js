import "./App.css";
import VideoDisplay from "./components/VideoDisplay";
import videos from "./data/exampleresponse.json";
import AddVideo from "./components/AddVideo";
import { useState } from "react";

function App() {
  const [allVideos, setAllVideos] = useState(videos);
  const click = () => {
    

    
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {/* <div><AddVideo /></div> */}
      <main className='videos'>
      
      
      
        <VideoDisplay className='display'  video={allVideos}/>
      
          
        </main>
      
    </div>
  );
}

export default App;
