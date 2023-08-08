import { useState, useEffect } from "react";
import axios from "axios";
import AddVideoForm from './AddVideoForm';

const VideoCard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const response = await axios.get('/videos');
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  }

  async function upVoteClicked(id) {
    try {
      await axios.put(`/videos/${id}/upvote`);
      const updatedVideos = videos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: video.rating + 1,
          };
        }
        return video;
      });
      setVideos(updatedVideos);
    } catch (error) {
      console.log(error);
    }
  }

  async function downVoteClicked(id) {
    try {
      await axios.put(`/videos/${id}/downvote`);
      const updatedVideos = videos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: video.rating - 1,
          };
        }
        return video;
      });
      setVideos(updatedVideos);
    } catch (error) {
      console.log(error);
    }
  }

  async function newVideo(video) {
    try {
      const response = await axios.post('/videos', video);
      setVideos([...videos, response.data.item]);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteVideo(videoId) {
    try {
      await axios.delete(`/videos/${videoId}`);
      const updatedVideos = videos.filter((video) => video.id !== videoId);
      setVideos(updatedVideos);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AddVideoForm newVideoAdded={newVideo} />
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2>{video.rating}</h2>
          <img
            src="https://www.svgrepo.com/show/334337/upvote.svg"
            alt="Up Vote"
            width="50"
            height="50"
            onClick={() => upVoteClicked(video.id)}
          ></img>
          <img
            src="https://www.svgrepo.com/show/333916/downvote.svg"
            alt="Down Vote"
            width="50"
            height="50"
            onClick={() => downVoteClicked(video.id)}
          ></img>
          <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
            Delete Video
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoCard;