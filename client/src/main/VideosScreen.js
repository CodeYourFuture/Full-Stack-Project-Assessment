import { useState } from "react";
import data from "../exampleresponse.json";
import AddVideo from "./AddVideo";

const VideoScreen = () => {
  const [like, setLike] = useState(0);
  const [unLike, setUnLike] = useState(0);
  const [videos, setVideos] = useState(data);
  function likeHandler() {
    setLike(like + 1);
  }
  function unLikeHandler() {
    setUnLike(unLike + 1);
  }
  function deleteHandler(index) {
    console.log(index);
    setVideos(videos.filter((video, i) => i !== index));
  }
  const addVideo = (title, url) => {
    setVideos([...videos, { title: title, url: url }]);
  };
  return (
    <div>
      <AddVideo addVideo={addVideo} />
      <div>
        {videos.map((video, index) => {
          return (
            <>
              <h3 key={index}>{video.title}</h3>
              <iframe
                width="400"
                height="280"
                src={video.url}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
              <h4 key={index}>Rating:{video.rating}</h4>
              <h5>Voted:{like - unLike}</h5>
              <button onClick={likeHandler}>👏🏼 Up Vote {like}</button>
              <button onClick={unLikeHandler}>🍅 Down Vote{unLike}</button>
              <button onClick={() => deleteHandler(index)}>Delete video</button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default VideoScreen;
