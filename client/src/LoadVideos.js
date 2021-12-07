import { useState, useEffect } from "react";
import YoutubeVideo from './YoutubeVideo';
import NumberOfVote from './NumberOfVote';

function LoadVideos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    
    fetch(`http://localhost:5000/`)
      .then((res) => {
        if (
        res.status === 200) {
        return res.json();
        }
          return null;
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.log("The error is " + error);
        // setVideos([]);
      });
  }, []);

function deleteVideo(e,id){    
    // e.preventDefault();
    const filtered = videos.filter(video=>{return video.id!==id})
    setVideos(filtered)
}

  return (
    <div>
      {videos.map((video, i) => (
        <div key={i}>
          <h2>{video.title}</h2>
          <NumberOfVote video={video} />
          <YoutubeVideo video={video} />
          <button
            onClick={(e) => {
              deleteVideo(e, video.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
export default LoadVideos;
