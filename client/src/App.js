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
  const [videoSortOrder, setVideoSortOrder] = useState("asc");

  // Fetch sorted data
  useEffect(() => {
    fetch(`http://localhost:5000/?order=${videoSortOrder}`)
      .then((res) => {
        if (res.status <= 200) {
          return res.json();
        } else {
          throw new Error(`Error ${res.status} : ${res.statusText}`);
        }
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.log(err));
  }, [videoSortOrder]);



  return (
    <div className="App">
      <Header />
      <Main
        videos={videos}
        setVideos={setVideos}
        videoSortOrder={videoSortOrder}
        setVideoSortOrder={setVideoSortOrder}
      />
      <Footer />
    </div>
  );
};

export default App;
