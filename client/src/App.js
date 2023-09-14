import "./App.css";
import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard";
import AddVideo from "./components/AddVideo";
import SortButton from "./components/SortButton";
import BubbleSortReverse from "./functions/BubbleSortReverse";

function App() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("Up");

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://127.0.0.1:5001/videos")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    };
    dataFetch();
  }, []);

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

  if (sort === "Down") {
    BubbleSortReverse(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <AddVideo addVideo={addVideo} />
        <SortButton sort={sort} setSort={setSort} />
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
