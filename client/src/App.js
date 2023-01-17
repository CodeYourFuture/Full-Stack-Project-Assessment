import { useState } from "react";
import './App.css';
import data from "./exampleresponse.json";
import Videos from "./Videos.js";
import Add from "./Add.js";

function App()
{
  const [videoData, setVideoData] = useState(data);
  const [sorted, setSorted] = useState(false);



  const sortData = (videoData, setVideoData, sorted) => 
  {
    if (sorted === false)
    {
      setVideoData([...videoData].sort((a, b) => b.rating - a.rating));
      setSorted(true)
    }
  }


  return (
    <div className="App">
      <Add data={videoData} setVideoData={setVideoData} setSorted={setSorted} />
      <div className='Holder'>
        <h1 id="VideoTitle">Videos</h1>
        {videoData.map((video, key) =>
        (
          <Videos data={videoData} setVideoData={setVideoData} video={video} key={key} />
        ))}
        {sortData(videoData, setVideoData, sorted)}
      </div>
    </div>
  );
}

export default App;