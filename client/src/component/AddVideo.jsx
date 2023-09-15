import { useState, useEffect } from "react";

function Addvideo() {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [idCounter, setIdCounter] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const getYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(/(?:\/|v=)([A-Za-z0-9_-]{11})(?=&|$)/);
    if (videoIdMatch) {
      return videoIdMatch[1];
    }

    const playlistIdMatch = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
    if (playlistIdMatch) {
      return playlistIdMatch[1];
    }

    return null;
  };

  const addVideo = async () => {
    if (newVideo.title && newVideo.url) {
      const videoId = getYouTubeVideoId(newVideo.url);

      if (videoId) {
        const videoToAdd = {
          ...newVideo,
          rating: 0,
          id: idCounter,
          timestamp: new Date().toISOString(),
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };

        try {
          const response = await fetch("/videos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(videoToAdd),
          });

          if (response.ok) {
            const newVideoFromServer = await response.json();
            setVideos([...videos, newVideoFromServer.video]);
            setNewVideo({ title: "", url: "" });
            setIdCounter(idCounter + 1);
            setErrorMessage("");
          } else {
            const errorData = await response.json();
            setErrorMessage(
              errorData.error || "Failed to add video. Please try again."
            );
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("An error occurred while adding the video.");
        }
      } else {
        setErrorMessage(
          "Invalid YouTube URL. Please enter a valid YouTube video URL."
        );
      }
    } else {
      setErrorMessage("Please fill in both title and URL fields.");
    }
  };

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/videos");
        if (response.ok) {
          const videoList = await response.json();
          setVideos(videoList);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Add a Video</h2>
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
      <button onClick={addVideo}>Add Video</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h2>Videos</h2>
    </div>
  );
}

export default Addvideo;
