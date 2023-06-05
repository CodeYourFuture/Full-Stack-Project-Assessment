import "./App.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import VideoPicker from "./components/VideoPicker/VideoPicker";
import Footer from "./components/Footer/Footer";
import AddVideoForm from "./components/AddVideoForm/AddVideoForm";
import { useState, useEffect, useRef } from "react";

function App() {
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

  useEffect(() => {
    fetchVideos();
  }, [order]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://video-server-wtvy.onrender.com?order=${order}`
      );
      const data = await response.json();
      console.log(data);
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("now");
  console.log(videos);
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
          fetchVideos={fetchVideos}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
