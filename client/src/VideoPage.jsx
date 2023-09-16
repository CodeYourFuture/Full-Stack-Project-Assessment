import React from "react";
import { useState } from "react";
// import videoData from "./exampleresponse.json";
import Title from "./components/Title";
import Videos from "./components/Videos";
import Button from "./components/Button";
import Rating from "./components/Ratings";
import Votes from "./components/Votes";


function VideoPage(params) {
  const [rating, setRating] = useState(0);
  const [videoData, setVideoData] = useState([
    {
      id: 523523,
      title: "Never Gonna Give You Up",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      rating: 23,
    },
    {
      id: 523427,
      title: "The Coding Train",
      url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
      rating: 230,
    },
    {
      id: 82653,
      title: "Mac & Cheese | Basics with Babish",
      url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
      rating: 2111,
    },
    {
      id: 858566,
      title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
      url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
      rating: 11,
    },
    {
      id: 453538,
      title:
        "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
      url: "https://www.youtube.com/watch?v=4As0e4de-rI",
      rating: 3211,
    },
    {
      id: 283634,
      title: "Learn Unity - Beginner's Game Development Course",
      url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
      rating: 211,
    },
    {
      id: 562824,
      title: "Cracking Enigma in 2021 - Computerphile",
      url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
      rating: 111,
    },
    {
      id: 442452,
      title: "Coding Adventure: Chess AI",
      url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
      rating: 671,
    },
    {
      id: 536363,
      title: "Coding Adventure: Ant and Slime Simulations",
      url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
      rating: 76,
    },
    {
      id: 323445,
      title: "Why the Tour de France is so brutal",
      url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
      rating: 73,
    },
  ]);


  const incrementRating = () => {
    setRating(rating + 1);
  };

  const decrementRating = () => {
    setRating(rating - 1);
  };

  // In your VideoPage component
  return (
    <div className="video-page">
      {videoData.map((video) => (
        <div key={video.id} className="video-card">
          <Title title={video.title} className="title" />
          <Videos video={video.id} className="video" />
          <div className="rating-votes">
          <h1>{rating}</h1>
            <Rating rating={video.rating} className="rating" />
            <Button
              onClick={incrementRating}
              text="Increment"
              className="vote-button"
            />
            <Button
              onClick={decrementRating}
              text="Decrement"
              className="vote-button"
            />
            <Votes className="votes-count" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default VideoPage;
//make  one state to hole the rating
//make two functions 
//two buttons and the onclick will point to each button