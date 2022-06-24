import "./App.css";
import React, { useEffect, useState } from "react";
import MainHeader from "./components/MainHeader";
import AddVideoHeader from "./components/AddVideoHeader";
import Video from "./components/Video";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [videos, setVideos] = useState([]);

  const getData = () => {
    axios.get("http://localhost:4000/").then((res) => {
      setVideos(res.data);
    });
  }; //getData() to display fetched data

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClick = (videoId) => {
    axios.delete(`http://localhost:4000/${videoId}`).then((res) => {
      if (res.status === 200) getData();
    });
  };

  return (
    <div className="app">
      <MainHeader />
      <AddVideoHeader setDisplayForm={setDisplayForm} />
      {displayForm ? (
        <Form
          videos={videos}
          SetVideos={setVideos}
          getData={getData()}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        ""
      )}
      <div className="sub-container">
        <Video videos={videos} handleDeleteClick={handleDeleteClick} />
      </div>
    </div>
  );
}

export default App;
