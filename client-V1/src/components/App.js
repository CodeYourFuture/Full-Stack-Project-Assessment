import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../assets/css/general.css";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Hedear from "./generic/Header";
import Footer from "./generic/Footer";
import Sidebar from "./generic/Sidebar";
import DashboardWeek1 from "./generic/DashboardWeek1";
import DashboardWeek2 from "./generic/DashboardWeek2";
import DashboardWeek3 from "./generic/DashboardWeek3";
import VideoList from "./videos/VideoList";
import AddVideo from "./videos/AddVideo";
// import videosData from "../data/exampleresponse.json";

const { Content } = Layout;

export default function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function getVideos() {
      // setVideos([...videosData]);
      const res = await fetch("http://localhost:5001");
      const data = await res.json();

      setVideos([...data]);
    }
    getVideos();
  }, []);

  const addVideo = (video, id) => {
    video.id = id;
    setVideos([...videos, video]);
  };

  const deleteVideo = async id => {
    const res = await fetch(`http://localhost:5001/${id}`, {
      method: "DELETE",
    });
    await res.json();
    setVideos(videos.filter(video => video.id !== id));
  };

  const incRating = async id => {
    const res = await fetch(`http://localhost:5001/${id}/inc-rating`, {
      method: "PATCH",
    });
    await res.json();
    setVideos(
      videos.map(video =>
        video.id !== id ? video : { ...video, rating: video.rating + 1 }
      )
    );
  };

  const decRating = async (id, rating) => {
    if (rating > 0) {
      const res = await fetch(`http://localhost:5001/${id}/dec-rating`, {
        method: "PATCH",
      });
      await res.json();

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
              <Route path="/Week1" element={<DashboardWeek1 />} />
              <Route path="/Week2" element={<DashboardWeek2 />} />
              <Route path="/Week3" element={<DashboardWeek3 />} />
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
