import React, { useState, useEffect } from "react";
import "./App.css";


import Form from "./Form";
import ListOfVideos from "./ListOfVideos";
import "./App.css";
import OrderButton from "./OrderButton";
import example from "./exampleresponse.json";

function App(props) {
 
  const [clicked, setClicked] = useState(false);
  // const [oneVideo, setOneVideo] = useState([]); //for fetch
  const [order, setOrder] = useState(example);//replace with oneVideo when try to fetch

  // const videosData = () => {
  //   fetch("http://127.0.0.1/5000") //try https://video-rec.herokuapp.com
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setOneVideo(data);
  //     });
  // };
  // useEffect(() => {
  //   videosData();
  // }, []);

  const orderHandler = () => {
    setClicked(true);
    if (clicked) {
      setOrder(example.sort((a, b) => a.rating - b.rating));
      setClicked(false);
    }
    if (!clicked) {
      let desc = example.sort((a, b) => b.rating - a.rating);
      setOrder(desc);
      setClicked(true);
    }
  };


  return (
    <div className="App">
      <header className="App-header bg-primary text-white">
        <h1>Video Recommendation</h1>
      </header>
      <OrderButton orderHandler={orderHandler} />
      <Form />

      <ListOfVideos ordered={order} />
    </div>
  );
}

export default App;
