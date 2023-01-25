import { useState, useEffect } from "react";
import './App.css';
import Videos from "./Videos.js";
import Add from "./Add.js";

function App()
{
  const [videoData, setVideoData] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() =>
  {
    if (fetched === false)
    {
      fetch("http://192.168.0.15:5000/")
        .then(res => res.json())
        .then(data => setVideoData(data))
        .catch(error => console.log(error))

      setFetched(true);
    }
  }, [fetched]);

  console.log(videoData)

  const sortData = (videoData) => 
  {
    return [...videoData].sort((a, b) => b.rating - a.rating);
  }


  return (
    <div className="App">
      <Add data={videoData} setVideoData={setVideoData} />
      <div className='Holder'>
        <h1 id="VideoTitle">Videos</h1>
        {sortData(videoData).map((video, key) =>
        (
          <Videos data={videoData} setVideoData={setVideoData} video={video} key={key} />
        ))}
      </div>
    </div>
  );
}

export default App;