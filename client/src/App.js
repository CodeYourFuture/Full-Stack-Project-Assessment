import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import Video from "./Video";
import VideoSearch from "./VideoSearch";
import ExampleResponse from "./exampleresponse.json";

function App() {
  const [id, setId] = useState(0);
  const [data, setData] = useState(ExampleResponse);
  console.log(data);

  //Prop Function to add video into data
  const addVideo = (title, url) => {
    const newVideo = {
      id: id,
      title: title,
      url: url,
      rating: 0,
    };
    setId((id) => id + 1);
    data.push(newVideo);
  };

  // Prop Function to remove a video
  const removeVideo = (id) => {
    const dataCopy = [...data];
    console.log(`removed video with id:${id}`);
    const index = dataCopy.findIndex((video) => {
      return video.id === id;
    });
    dataCopy.splice(index, 1);
    setData(dataCopy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <VideoSearch />
      </header>
      <main>
        <AddVideo addVideo={addVideo} />
        {data.map((video) => {
          return (
            <Video
              key={video.id}
              title={video.title}
              rating={video.rating}
              Url={video.url}
              videoId={video.id}
              deleteVideo={removeVideo}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
