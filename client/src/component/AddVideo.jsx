import { useState } from "react";

function Addvideo() {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [idCounter, setIdCounter] = useState(1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const addVideo = () => {
    if (newVideo.title && newVideo.url) {
      const videoToAdd = {
        ...newVideo,
        rating: 0,
        id: idCounter,
        timestamp: new Date().toISOString(),
      };
      setVideos([...videos, videoToAdd]);
      setNewVideo({ title: "", url: "" });
      setIdCounter(idCounter + 1);
    }
  };

  const upvoteVideo = (id) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating + 1 } : video
    );
    setVideos(updatedVideos);
  };

  const downvoteVideo = (id) => {
    const updatedVideos = videos.map((video) =>
      video.id === id && video.rating > 0
        ? { ...video, rating: video.rating - 1 }
        : video
    );
    setVideos(updatedVideos);
  };

  const removeVideo = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

  const getYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(/(?:\/|v=)([A-Za-z0-9_-]{11})(?=&|$)/);
    if (videoIdMatch) {
      return videoIdMatch[1];
    }
    return "";
  };

  return (
    <>
      <div>
        <h2>Add Your Favorite Youtube Videos</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newVideo.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={newVideo.url}
          onChange={handleInputChange}
        />
        <button onClick={addVideo}>Add Youtube Video</button>
      </div>
      <div>
        <h2>Favorite Videos</h2>
        <ul className="ShowingVideos">
          {videos.map((video) => (
            <div className="videos" key={video.id}>
              <li>
                <h3>{video.title}</h3>
                <div className="buttons">
                  <i
                    className="fa-solid fa-thumbs-up"
                    onClick={() => upvoteVideo(video.id)}
                  ></i>
                  <h4>{video.rating}</h4>
                  <i
                    className="fa-solid fa-thumbs-down"
                    onClick={() => downvoteVideo(video.id)}
                  ></i>
                </div>
                <iframe
                  className="allVideos"
                  title={video.title}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    video.url
                  )}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <p>Posted at: {new Date(video.timestamp).toLocaleString()}</p>

                <button onClick={() => removeVideo(video.id)}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Addvideo;