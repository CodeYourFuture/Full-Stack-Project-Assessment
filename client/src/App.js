import "./App.css";
import { useState } from "react";
import exampleresponse from "./exampleresponse.json";
import VideoCard from "./components/VideoCard";
import AddVideo from "./components/AddVideo";
import BubbleSort from "./functions/BubbleSort";

BubbleSort(exampleresponse);

function App() {
  const [data, setData] = useState(exampleresponse);

  const deleteHandle = (id) => {
    const updatedData = data.filter((video) => video.id !== id);
    setData(updatedData);
  };

  const addVideo = (title, url, uploadTime) => {
    const newVideo = {
      id: data.length + 1,
      title: title,
      url: url,
      rating: 0,
      uploadTime: uploadTime,
    };
    setData([...data, newVideo]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <AddVideo addVideo={addVideo} />
        <div className="video-cards">
          {data.map((video) => (
            <VideoCard
              key={video.id}
              url={video.url}
              title={video.title}
              rating={video.rating}
              uploadTime={video.uploadTime}
              delete={() => deleteHandle(video.id)}
            />
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
