import "./App.css";
import videoData from "./exampleresponse.json";
import VideoContainer from "./VideoContainer";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
import AddVideoBtn from "./videoAddbtn";
import { useState } from "react";

function App() {
  const [data, setData] = useState(videoData);
  const [videoList, setVideoList] = useState();
  const [addVideoForm, setAddVideoForm] = useState(false);

  console.log(data);
  const removeVideo = (id) => {
    const dataCopy = [...data];
    console.log("remove video");
    console.log(id);
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
      </header>
      <AddVideoBtn
        addVideoForm={addVideoForm}
        setAddVideoForm={setAddVideoForm}
      />
      <AddVideo
        addVideoForm={addVideoForm}
        videoList={videoList}
        setVideoList={setVideoList}
      />
      <SearchVideo />
      {data.map((video) => {
        return (
          <VideoContainer
            key={video.id}
            videoTitle={video.title}
            videoRating={video.rating}
            videoUrl={video.url}
            removeVideo={removeVideo}
            videoId={video.id}
          />
        );
      })}
    </div>
  );
}

export default App;
