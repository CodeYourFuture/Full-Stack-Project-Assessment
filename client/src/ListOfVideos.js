import React, { useState, useEffect } from "react";
import "./App.css";
import OrderButton from "./OrderButton";
import ThumbUpDown from "./ThumbUp_Down";
const ListOfVideos = (props) => {
  const [oneVideo, setOneVideo] = useState([]);
  const [order, setOrder] = useState([]);
  const [descOrder, setDescOrder] = useState([]);
  const [clicked, setClicked] = useState(true);
  const deleteHandler = (Id) => {
    setOneVideo(oneVideo.filter((item) => item.id !== Id));
  };

  const videosData = () => {
    fetch("https://myvideos-api.herokuapp.com/") //http://localhost:5000/ I deployed my api app to heroku as I was not able to connect to my local host
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setOneVideo(data);
        setDescOrder(data);
      });
  };
  useEffect(() => {
    videosData();
  }, []);

  const Data = () => {
    fetch("https://myvideos-api.herokuapp.com/?order=asc") // http://localhost:5000/?order=asc"
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  };
  useEffect(() => {
    Data();
  }, []);
  const orderHandler = () => {
    setClicked(true);
    if (clicked) {
      setOneVideo(order);
      setClicked(false);
    }
    if (!clicked) {
      setOneVideo(descOrder);
      setClicked(true);
    }
  };
  return (
    <div>
      <OrderButton order={orderHandler} />
      <div className="video-container">
        {oneVideo.map((item, index) => {
          return (
            <div key={index} className="visible">
              <div className="vote">
                <ThumbUpDown rating={item.rating} />
              </div>
              <p>{item.title}</p>
              <iframe
                width="300"
                height="300"
                src={item.url.replace("watch?v=", "embed/")}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => deleteHandler(item.id)}
                type="button"
                className="btn btn-primary mt-3"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ListOfVideos;
