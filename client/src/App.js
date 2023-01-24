import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import VideosGrid from "./components/VideosGrid";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import "./App.css";

function App() {
  const [videosData, setVideosData] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    isRequiredTitleError: false,
    isRequiredUrlError: false,
    isValidUrlError: false,
  });
  const [videoData, setVideoData] = useState({
    id: 0,
    title: "",
    url: "",
    rating: 0,
    postedAt: 0,
  });

  async function fetchData() {
    try {
      const res = await fetch("/videos");
      const jsonData = await res.json();
      setVideosData(formatVideosUrl(jsonData));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  });

  videosData.sort((a, b) => b.rating - a.rating);

  function formatVideosUrl(videos) {
    const formattedVideosData = videos.map((video) => {
      video.url = video.url.replace("watch?v=", "embed/");
      return video;
    });
    return formattedVideosData;
  }
  function isValidYouTubeUrl(url) {
    if (url !== undefined || url !== "") {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
      return url.match(regExp) ? url : false;
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    setErrors({
      isRequiredTitleError: false,
      isRequiredUrlError: false,
      isValidUrlError: false,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const incrementRating = (e) => {
    let videoId = parseInt(e.currentTarget.name);
    const newVideos = videosData.map((vid) => {
      if (vid.id === videoId) {
        return {
          ...vid,
          rating: ++vid.rating,
        };
      } else {
        return vid;
      }
    });
    setVideosData(newVideos);
  };

  const decrementRating = (e) => {
    let videoId = parseInt(e.currentTarget.name);
    const newVideos = videosData.map((vid) => {
      if (vid.id === videoId) {
        return {
          ...vid,
          rating: --vid.rating,
        };
      } else {
        return vid;
      }
    });
    setVideosData(newVideos);
  };

  const handleInputChange = (e) => {
    setErrors({
      isRequiredTitleError: false,
      isRequiredUrlError: false,
      isValidUrlError: false,
    });
    const updatedVideoData = {
      ...videoData,
      [e.target.name]: e.target.value,
    };
    setVideoData(updatedVideoData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date();

    if (videoData.title) {
      if (videoData.url) {
        if (isValidYouTubeUrl(videoData.url)) {
          setVideoData({
            ...videoData,
            postedAt: date,
          });
          setVideosData(formatVideosUrl([...videosData, videoData]));
          setOpen(false);
          setErrors({
            isRequiredTitleError: false,
            isRequiredUrlError: false,
            isValidUrlError: false,
          });
        } else {
          setErrors({ ...errors, isValidUrlError: true });
        }
      }
      if (!videoData.url) {
        setErrors({ ...errors, isRequiredUrlError: true });
      }
    }

    if (!videoData.title) {
      if (!videoData.url) {
        setErrors({
          ...errors,
          isRequiredTitleError: true,
          isRequiredUrlError: true,
        });
      }
      if (videoData.url) {
        if (!isValidYouTubeUrl(videoData.url)) {
          setErrors({
            ...errors,
            isRequiredTitleError: true,
            isValidUrlError: true,
          });
        } else {
          setErrors({
            ...errors,
            isRequiredTitleError: true,
          });
        }
      }
    }
  };

  function deleteVideo(e) {
    const videoId = parseInt(e.currentTarget.name);
    setVideosData(videosData.filter((video) => video.id !== videoId));
  }

  return (
    <div className="App">
      <Box>
        <Header />
        <AddVideoForm
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          open={open}
          errors={errors}
        />
        <VideosGrid
          voteUp={incrementRating}
          voteDown={decrementRating}
          videosData={videosData}
          deleteVideo={deleteVideo}
        />
      </Box>
    </div>
  );
}

export default App;
