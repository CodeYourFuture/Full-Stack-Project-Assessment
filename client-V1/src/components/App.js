import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../assets/css/general.css";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Hedear from "./generic/Header";
import Footer from "./generic/Footer";
import Sidebar from "./generic/Sidebar";
import Dashboard from "./generic/Dashboard";
import VideoList from "./videos/VideoList";
import AddVideo from "./videos/AddVideo";
import videosData from "../data/exampleresponse.json";

const { Content } = Layout;

export default function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function getVideos() {
      setVideos([...videosData]);
    }
    getVideos();
  }, []);

  const addVideo = video => {
    console.log(video);
    setVideos([...videos, video]);
  };

  const deleteVideo = id => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const incRating = id => {
    setVideos(
      videos.map(video =>
        video.id !== id ? video : { ...video, rating: video.rating + 1 }
      )
    );
  };

  const decRating = (id, rating) => {
    if (rating > 0) {
      setVideos(
        videos.map(video =>
          video.id !== id ? video : { ...video, rating: video.rating - 1 }
        )
      );
    }
  };
  return (
    <div className="App">
      <Layout>
        <Hedear />
        <Layout>
          <Sidebar />
          <Content className="content">
            <Routes>
              <Route path="/Week1" element={<Dashboard />} />
              <Route
                path="/video"
                element={
                  <VideoList
                    videos={videos}
                    deleteVideo={deleteVideo}
                    incRating={incRating}
                    decRating={decRating}
                  />
                }
              />
              <Route
                path="/video/addVideo"
                element={<AddVideo addVideo={addVideo} />}
              />
            </Routes>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
}
