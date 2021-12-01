import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [sortedVideos, setSortedVideos] = useState([]);

  // Fetch Data
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => {
        if (res.status <= 200) {
          return res.json();
        } else {
          throw new Error(`Error ${res.status} ${res.statusText}`);
        }
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Sort initial data in descending order
  useEffect(() => {
    const sortedVideos = [...videos].sort((v1, v2) => v2.rating - v1.rating);
    setSortedVideos(sortedVideos);
  }, [videos]);

  return (
    <div className="App">
      <Header />
      <Main videos={sortedVideos} setVideos={setVideos} />
      <Footer />
    </div>
  );
};

export default App;
