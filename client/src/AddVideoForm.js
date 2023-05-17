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

  //Should I leave this function here or put it in the server?
  //Do I check if the url is valid in the front end?
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    videoTitle !== ""
      ? (newVideo.title = videoTitle)
      : alert("Please add a title for your video.");

    isValidUrl(videoUrl)
      ? (newVideo.url = videoUrl)
      : alert("Please add a valid url.");
    newVideo.rating = Math.floor(Math.random() * 5000) + 1;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // add 1 because getMonth() returns 0-11
    const currentDay = currentDate.getDate();
    newVideo.date = currentYear + "-" + currentMonth + "-" + currentDay;

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    newVideo.time = currentHours + ":" + currentMinutes + ":" + currentSeconds;

    newVideo.id = videoUrl.split("=")[1];
    setVideos([...videos, newVideo]);

    setNewVideo({});
    setVideoTitle("");
    setVideoUrl("");
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
