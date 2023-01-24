import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import AddVideos from "./AddVideos";

function App() {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching data...");
    fetch(` http://localhost:5000/`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `Encountered something unexpected: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        // data.error ? setStatus("loading failed") :
        setVideoData(data);
        setLoading(true);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  }, [loading]);

  const deleteVideos = (id) => {
    setVideoData((videoData) => videoData.filter((data) => data.id !== id));
  };

  const addVideos = (vidInfo) => {
    setVideoData((videoData) => videoData.concat(vidInfo));
    console.log(videoData);
  };

  const updateRatings = (id, likes) => {
    setVideoData((videoData) =>
      videoData.map((el) => {
        if (el.id === id) {
          el.rating = likes;
        }
        return el;
      })
    );
    console.log(videoData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <section>
          <AddVideos addVideos={addVideos} />
        </section>
        <section className="videoDisplay">
          {videoData.map((video) => (
            <Video
              video={video}
              key={video.id}
              deleteVideos={deleteVideos}
              updateRatings={updateRatings}
            />
          ))}
        </section>
      </body>
    </div>
  );
}

export default App;
