import "./App.css";
import React, { useState, useEffect } from "react";

import Video from "./Video";
import NavBar from "./NavBar";

const baseUrl =
  process.env.REACT_APP_MODE === "prod"
    ? "https://video-recommendation-backend.cbaggini.repl.co"
    : "http://localhost:5000";

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc_rating");

  const getVideos = () => {
    let url = baseUrl + `?order=${order}`;
    if (search !== "") {
      url += `&title=${search}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  };

  const deleteVideo = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": baseUrl,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.message ? alert(data.message) : getVideos();
      })
      .catch((err) => {
        console.log(err);
        alert("Could not delete video");
      });
  };

  useEffect(getVideos, [search, order]);

  return (
    <>
      <header>
        <h1>Video recommendation system</h1>
      </header>
      <NavBar
        setSearch={setSearch}
        setOrder={setOrder}
        baseUrl={baseUrl}
        getVideos={getVideos}
      />
      <section>
        {videos.map((el) => (
          <Video
            key={el.id}
            {...el}
            deleteVideo={deleteVideo}
            baseUrl={baseUrl}
          />
        ))}
      </section>
    </>
  );
}

export default App;
