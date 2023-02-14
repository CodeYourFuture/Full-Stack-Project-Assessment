import { useState, useEffect } from "react";
import AddVideo from "./AddVideo";

const VideoScreen = () => {
  const [videos, setVideos] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
    if (!title || !url) {
      console.log("Both title and URL must be filled");
      setShowMessage(true);
    } else if (!url.includes("https://www.youtube.com/")) {
      console.log("Youtube Url not valid");
      setShowMessage(true);
    } else {
      setVideos([...videos, newFavVideo]);
      setShowMessage(false);
    }
  };
  return (
    <div>
      <AddVideo addVideo={addVideo} />
      {showMessage && (
        <div className="error-message">
          Both title and URL must be filled and the URL must be a valid YouTube
          URL.
        </div>
      )}
      <div className="card">
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((video, index) => {
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
                <h3 className="card-text" key={index}>
                  {video.title}
                </h3>
                <h4 className="card-text" key={index}>
                  Rating:{video.rating}
                </h4>
                {/* <h5>Voted:{video.rating}</h5> */}
                <button onClick={() => likeHandler(index)}>👏🏼 Up Vote</button>
                <button onClick={() => unLikeHandler(index)}>
                  🍅 Down Vote
                </button>
                <button onClick={() => deleteHandler(index)}>
                  Delete video
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VideoScreen;
