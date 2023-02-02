import { useState } from "react";
import data from "../exampleresponse.json";
import AddVideo from "./AddVideo";

const VideoScreen = () => {
  const [videos, setVideos] = useState(data);
  function likeHandler(index) {
    setVideos(
      videos.map((video, i) => {
        if (i === index) {
          return { ...video, rating: video.rating + 1 };
        }
        return video;
      })
    );
  }
  function unLikeHandler(index) {
    setVideos(
      videos.map((video, i) => {
        if (i === index) {
          return { ...video, rating: video.rating - 1 };
        }
        return video;
      })
    );
  }
  function deleteHandler(index) {
    console.log(index);
    setVideos(videos.filter((video, i) => i !== index));
  }
  const addVideo = (title, url) => {
    const newFavVideo = { title: title, url: url, rating: 0 };
    if (!title || !url || !url.includes("https://www.youtube.com/")) {
      console.log("Both title and URL must be filled");
    } else {
      setVideos([...videos, newFavVideo]);
    }
  };
  return (
    <div>
      <AddVideo addVideo={addVideo} />
      <div className="card">
        {videos.map((video, index) => {
          return (
            <div className="card-item">
              <iframe
                width="400"
                height="280"
                src={video.url}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
                className="card-img-top"
              />
              <h3 key={index}>{video.title}</h3>
              <h4 key={index}>Rating:{video.rating}</h4>
              {/* <h5>Voted:{video.rating}</h5> */}
              <button onClick={() => likeHandler(index)}>👏🏼 Up Vote</button>
              <button onClick={() => unLikeHandler(index)}>🍅 Down Vote</button>
              <button onClick={() => deleteHandler(index)}>Delete video</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoScreen;
