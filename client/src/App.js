import React, { useState, useEffect } from "react";
import "./App.css";
import AddNewVideo from "./AddNewVideo";
import SearchVideo from "./SearchVideo";
import PopulateVideos from "./PopulateVideos";

function App() {
  const [defaultVideoData, setDefaultVideoData] = useState([]);

  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then(data => setDefaultVideoData(data))
      .catch((e) => console.log(e));
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/videos");
  //       const json = await res.json();
  //       setDefaultVideoData(json);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, [])
  console.log(defaultVideoData);

  const [videoData, setVideoData] = useState(defaultVideoData);
  videoData.sort((b, a) => a.rating - b.rating)
  
  // const [title, setTitle] = useState("");
  // const [url, setUrl] = useState('');
  // const [rating, setRating] = useState(0);
  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddNewVideo videoData={videoData} setVideoData={setVideoData} />
      <hr className="hr"></hr>
      <SearchVideo videoData={videoData} setVideoData={setVideoData} />
      {/* <PopulateVideos
        defaultVideoData={defaultVideoData}
        setDefaultVideoData={setVideoData}
      />
       */}
      <PopulateVideos
        defaultVideoData={defaultVideoData}
        setDefaultVideoData={setVideoData}
      />
    </div>
  );
}

export default App;
