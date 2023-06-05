/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import VideoPicker from "./components/VideoPicker/VideoPicker";
import Footer from "./components/Footer/Footer";
import AddVideoForm from "./components/AddVideoForm/AddVideoForm";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const categories = [
    "Comedy",
    "Music",
    "Beauty",
    "Travel",
    "Favorites",
    "Others",
  ];
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc");
  const [passedCategory, setPassedCategory] = useState("");
  const videoPickerRef = useRef(null);

  // Function to fetch videos from the server
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://video-server-wtvy.onrender.com?order=${order}`
      );
      const data = await response.json();

      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   // Fetch videos when the order changes
  //   fetchVideos();
  // }, [order]);

  return (
    <div className="App">
      <Header categories={categories} />
      <main>
        <Categories
          categories={categories}
          setVideos={setVideos}
          passedCategory={passedCategory}
          setPassedCategory={setPassedCategory}
          videoPickerRef={videoPickerRef}
        />
        <AddVideoForm categories={categories} fetchVideos={fetchVideos} />
        <VideoPicker
          categories={categories}
          videos={videos}
          setOrder={setOrder}
          setVideos={setVideos}
          passedCategory={passedCategory}
          videoPickerRef={videoPickerRef}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
