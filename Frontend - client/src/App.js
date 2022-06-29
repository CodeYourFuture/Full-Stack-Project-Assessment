import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import videos from '../src/data';
import Header from "./Header";
import Add from "./Add";
import Card from "./Card";
import Footer from "./Footer";

function createCard(video, delete2) {
  return (
    <Card
      clicked={delete2}
      key={video.id}
      id={video.id}
      name={video.title}
      url={video.url}
      rating={video.rating}
    />
  );
}

const App = () => {
  const [vid, setVid] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/videos")
      .then((res) => {
        console.log(res);
        console.log(res.data.data.videos);
        setVid(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Add a video
  function addVid(newVid) {
    const url = "http://localhost:5000/videos";

    axios.post(url, newVid).then((res) => {
      console.log(res);
      setVid((prevVid) => {
        return [res.data, ...prevVid];
      });
    });
  }

  //delete the vid
  const deleteVid = (id) => {
    console.log(id);
    const index = vid.findIndex((item) => item.id === id);
    axios.delete("http://localhost:5000/videos/" + id);

    setVid([...vid.slice(0, index), ...vid.slice(index + 1)]);
  };

  return (
    <div className="App">
      <Header handleSearch={setSearch} />

      <Add onAdd={addVid} />

      <div className="main-container">
        {vid
          .filter((video) => video.title.toLowerCase().includes(search))
          .map((item) => createCard(item, deleteVid))}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;


/*
  import React, { useEffect, useState } from "react";
import "./App.css";
import "./RenderVideos.css";
import RenderVideos from "./RenderVideos";
import NewVideos from "./NewVideos";
import axios from "axios";


function App() {
  const [allVideos, setAllVideos] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://full-stack-project-assesment.herokuapp.com/")
      .then((res) => {
        setAllVideos(res.data);
      });
  }, []);

  // A function to delete video
  const deleteVideos = (arrVideo) => {
    //To delete from front end
    //  setAllVideos((videos) => {
    //    return videos.filter((v) => {
    //      return v.id !== arrVideo.id;
    //    });
    //  });

    // To delete from the server
       axios
         .delete(
           `https://full-stack-project-assesment.herokuapp.com/${arrVideo.id}`
         )
         .then((res) => {
           if (res.status === 200) {
             axios
               .get("https://full-stack-project-assesment.herokuapp.com/")
               .then((res) => {
                 setAllVideos(res.data);
               });
           }
         });
  };
 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <h2 className="add-video-title" onClick={() => setVisible(true)}>
        Add Video
      </h2>

      {visible && (
        <NewVideos
          myAllVideos={allVideos}
          setAllVideos={setAllVideos}
          setVisible={setVisible}
        />
      )}

      <div className="wrapper">
        {console.log("this is app", allVideos)}
        {allVideos.map((video) => (
          <div className="video-card" key={video.id}>
            <RenderVideos video={video} deleteVideos={deleteVideos} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

*/