import Videos from "./Comp/Videos";
import AddVid from "./Comp/AddVid";
import data from "./Data/data.json";
import { useState } from "react";

console.log(data)
function App() {
  const [videos, setVideos] = useState(data);
   
  const onVideoDelete = (index)=>{
    console.log(onVideoDelete);
    const videosCopy = [...videos];
    videosCopy.splice(index,1)
    setVideos(videosCopy);
  }

  return (
    <div >
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVid />
      <Videos videos={videos} onVideoDelete={onVideoDelete} />
    </div>
  );
}

export default App;
