import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const [videos, setVideos] = useState([]);
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
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main videos={videos} setVideos={setVideos} />
      <Footer />
    </div>
  );
};

export default App;
