import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import VideosGrid from "./components/VideosGrid";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import Alert from "@mui/material/Alert";
import "./App.css";
import OrderBtns from "./components/OrderBtns";

function App() {
  const [videosData, setVideosData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [order, setOrder] = useState("desc");
  const [errors, setErrors] = useState({
    isRequiredTitleError: false,
    isRequiredUrlError: false,
    isValidUrlError: false,
  });
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
    rating: 0,
    postedAt: 0,
  });

  async function getAllVideos() {
    try {
      const res = await fetch(`api?order=${order}`);
      const jsonData = await res.json();
      setVideosData(formatVideosUrl(jsonData));
    } catch (error) {
      console.log(error);
    }
  }

  async function createNewVideo() {
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(videoData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      console.log("Success:", jsonData);
    } catch (error) {
      console.log({ error });
    }
  }
  async function updateVideo(e, video, id) {
    try {
      const res = await fetch(`api/${id}`, {
        method: "PATCH",
        body: JSON.stringify(video),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      setVideosData(jsonData);
    } catch (error) {
      console.log({ error });
    }
  }
  useEffect(() => {
    getAllVideos();
  }, [videosData]);

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
    let updatedVideo = videosData.filter((vid) => vid.id === videoId);

    if (updatedVideo) {
      updatedVideo[0].rating += 1;
      updateVideo(e, updatedVideo[0], updatedVideo[0].id);
    }
  };

  const decrementRating = (e) => {
    let videoId = parseInt(e.currentTarget.name);
    let updatedVideo = videosData.filter((vid) => vid.id === videoId);

    if (updatedVideo) {
      updatedVideo[0].rating -= 1;
      updateVideo(e, updatedVideo[0], updatedVideo[0].id);
    }
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
          createNewVideo();
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

  async function deleteVideo(e) {
    const videoId = parseInt(e.currentTarget.name);
    await fetch(`api/${videoId}`, {
      method: "DELETE",
    });
    setIsDeleted(true);
  }

  // Timer for hiding the banner message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeleted(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isDeleted]);

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };
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
        <OrderBtns order={order} handleChange={handleOrderChange} />
        {isDeleted && (
          <Alert
            sx={{
              width: { xs: "100%", md: "50%" },
              justifyContent: "center",
              margin: "auto",
            }}
            severity="success"
          >
            Video is successfully deleted
          </Alert>
        )}
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
