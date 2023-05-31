import "./App.css";
import Search from "./components/Search";
import AddVideos from "./components/Add-Videos";
import { useEffect, useState } from "react";
import data from "./exampleresponse.json";
import Header from "./components/Header";
import { nanoid } from "nanoid";

function App() {
  const [visible, setVisible] = useState(false);
  const [videos, setVideos] = useState(data);
  const [changeInRating, setChangeInRating] = useState(0);
  const [videoId, setVideoId] = useState(null);

  const [newVideo, setNewVideo] = useState([]);
  const [addedVideo, setAddedVideo] = useState({
    title: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddedVideo((addedVideo) => ({
      ...addedVideo,
      [name]: value,
    }));
  };

  const addToVideos = (event) => {
    event.preventDefault();
    setNewVideo(
      newVideo.concat({
        id: nanoid(),
        title: addedVideo.title,
        url: addedVideo.url,
      })
    );
    event.target.reset();
  };

  useEffect(() => {
    setVideos((data) => [...data, ...newVideo]);
  }, [newVideo]);

  function inputsTableVisibility() {
    visible ? setVisible(false) : setVisible(true);
  }

  const increaseVote = (currentVideoId) => {
    setVideoId(currentVideoId);
    setChangeInRating(changeInRating + 1);
  };

  const decreaseVote = (tVideoId) => {
    setVideoId(tVideoId);
    setChangeInRating(changeInRating - 1);
  };

  const deleteVote = (tVideoId) => {
    setVideos((data) => data.filter((video) => video.id !== tVideoId));
  };

  return (
    <div className="App">
      <Header />
      <Search />
      <button className="add-video" onClick={inputsTableVisibility}>
        Add Video
      </button>
      {visible && (
        <AddVideos
          inputsTableVisibility={inputsTableVisibility}
          addToVideos={(event) => addToVideos(event)}
          handleChange={handleChange}
        />
      )}
      <div>
        <div>
          {videos.map((video) => (
            <div key={video.id}>
              <div>{video.title}</div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div>
                {video.rating + (videoId === video.id ? changeInRating : 0)}
              </div>
              <button onClick={() => increaseVote(video.id)}>Up Vote</button>
              <button onClick={() => decreaseVote(video.id)}>Down Vote</button>
              <button onClick={() => deleteVote(video.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
