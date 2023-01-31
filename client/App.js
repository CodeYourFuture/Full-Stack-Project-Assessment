import { useState, useEffect } from "react";
import './App.css';
import Add from "./Add.js";
import Sort from "./Sort.js";
import Map from "./Map.js";

function App()
{
  const [videoData, setVideoData] = useState([]);
  const [sort, setSort] = useState("?order=desc");


  useEffect(() =>
  {

    fetch("http://192.168.0.15:5000/videos" + sort)
      .then(res => res.json())
      .then(data => setVideoData(data))
      .catch(error => console.log(error))


  }, [sort]);



  return (
    <div className="App">
      <Sort sort={sort} setSort={setSort} />
      <Add data={videoData} setVideoData={setVideoData} />
      <div className='Holder'>
        <h1 id="VideoTitle">Videos</h1>
        <Map videoData={videoData} setVideoData={setVideoData} sort={sort} />
      </div>
    </div>
  );
}

export default App;