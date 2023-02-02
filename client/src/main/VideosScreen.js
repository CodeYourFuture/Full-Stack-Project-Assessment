import { useState } from "react";
import data from "../exampleresponse.json";
import AddVideo from "./AddVideo";

const VideoScreen = () => {
  const [like, setLike] = useState(0);
  const [unLike, setUnLike] = useState(0);
  const [videos, setVideos] = useState(data);
  const [vote, setVote] = useState(0);
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
    setVideos([...videos, { title: title, url: url, rating: 0 }]);
  };
  return (
    <div className="card-item">
      <AddVideo addVideo={addVideo} />
      <div>
        {videos.map((video, index) => {
          return (
            <div>
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
              <h4 key={index}>{video.title}</h4>
              <h5 key={index}>Rating:{video.rating}</h5>
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
