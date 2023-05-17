import "./App.css";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { videosContext } from "./App.js";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

export const AddVideoForm = () => {
  const { videos, setVideos } = useContext(videosContext);

  const [newVideo, setNewVideo] = useState({});
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadTime, setUploadTime] = useState("");
  const [uploadDate, setUploadDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // add 1 because getMonth() returns 0-11
    const currentDay = currentDate.getDate();
    newVideo.uploadDate = currentYear + "-" + currentMonth + "-" + currentDay;

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    newVideo.uploadTime =
      currentHours + ":" + currentMinutes + ":" + currentSeconds;

    fetch("http://localhost:5000/videos", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: videoTitle,
        url: videoUrl,
        time: uploadTime,
        date: uploadDate,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Please ensure the information is correct");
        }
        return response.json();
      })
      .then((newVideo) => {
        setVideos([...videos, newVideo]);
        setNewVideo({});
        setVideoTitle("");
        setVideoUrl("");
        setUploadTime("");
        setUploadDate("");
      })
      .catch((error) => alert(error.message));
  }

  return (
    <ScrollAnimation animateIn="animate__animated animate__backInLeft">
      <form onSubmit={handleSubmit} className="home-form">
        <legend>Add your video here</legend>
        <div className="form-section-wrapper">
          <label htmlFor="video-url" className="form-label">
            Video URL *
          </label>
          <input
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            type="text"
            id="video-url"
            name="video-url"
            className="form-input"
          />
        </div>
        <div className="form-section-wrapper">
          <label htmlFor="video-title" className="form-label">
            Title *
          </label>
          <input
            value={videoTitle}
            onChange={(event) => setVideoTitle(event.target.value)}
            type="text"
            id="video-title"
            name="video-title"
            className="form-input"
          />
        </div>
        <button className="home-form-btn">Submit</button>
      </form>
    </ScrollAnimation>
  );
};
