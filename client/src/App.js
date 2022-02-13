import { useState, useEffect } from "react";

import "./style/App.css"; // import master CSS file
import VideoCards from "./components/VideoCards";
import AddVideo from "./components/AddVideo";
//
const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      const result = await fetch(`http://127.0.0.1:5000/`);
      result
        .json()
        .then((result) => {
          setVideos((videos) => {
            const newVideos = [...videos]; // make a copy
            newVideos.push(result.videos); // push new data onto that copy
            return newVideos[0]; // return the copy with all the old data + new data
          });
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <div id="whole-page" className="App">
      <header id="page-header" className="page-header">
        <h1 id="first-heading" className="first-heading">
          Videos!
        </h1>
      </header>
      <main id="main-content">
        <AddVideo setState={setVideos} />
        {videos.length === undefined || videos.length === 0 ? (
          <h2 className={"orange-text"}>Add some videos!</h2>
        ) : (
          videos.map((video) => <VideoCards video={video} key={video.id} />)
        )}
      </main>
    </div>
  );
};

export default App;
