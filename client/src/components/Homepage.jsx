import React, { useState, useEffect } from "react";
import "../App.css";
import Video from "./molecules/Video";
import NewVideoForm from "./molecules/NewVideoForm";
import axios from "axios";
import Button from "./atoms/Button";

function Homepage() {
  const [videos, setVideos] = useState([]);
  const [addVideoClicked, setAddVideoClicked] = useState(false);
  const [order, setOrder] = useState("asc");
  const addHideBtnStyle = {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  };

  function loadVideos() {
    axios({
      method: "get",
      url: "/api/?order=" + order,
    }).then((response) => {
      setVideos(response.data);
    });
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/?order=" + order,
    }).then((response) => {
      setVideos(response.data);
    });
  }, [order]);

  return (
    <div>
      <header>
        <h1>Video Recommendations</h1>
      </header>
      {addVideoClicked === false ? (
        <Button
          handleClick={() => {
            setAddVideoClicked(!addVideoClicked);
          }}
          btnName="Add Video"
          style={addHideBtnStyle}
        />
      ) : (
        <>
          <NewVideoForm loadVideos={loadVideos} />{" "}
          <Button
            handleClick={() => setAddVideoClicked(!addVideoClicked)}
            btnName="Hide form"
            style={addHideBtnStyle}
          />
        </>
      )}
      <div className="container">
        <Button
          handleClick={() =>
            order === "asc" ? setOrder("desc") : setOrder("asc")
          }
          btnName={order === "asc" ? "Highest rating" : "Lowest rating"}
        />
        <ul className="row">
          {videos.map((video) => {
            return (
              <Video
                loadVideos={loadVideos}
                key={video.id}
                video={video}
              ></Video>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Homepage;
