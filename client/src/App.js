import "./App.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import VideoPicker from "./components/VideoPicker/VideoPicker";
import Footer from "./components/Footer/Footer";
import AddVideoForm from "./components/AddVideoForm/AddVideoForm";
import { useState, useEffect } from "react";

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
        <Categories categories={categories} setVideos={setVideos} />
        <AddVideoForm categories={categories} fetchVideos={fetchVideos} />
        <VideoPicker
          categories={categories}
          videos={videos}
          setOrder={setOrder}
          setVideos={setVideos}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
