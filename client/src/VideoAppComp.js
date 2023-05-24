import { useState } from "react";
import styled from "styled-components";
import VideoForm from "./VideoSubForm";
import VideoCard from "./VideoCard";
import exampleresponse from "./exampleresponse.json";

const VideoApp = () => {
  const [videos, setVideos] = useState([...exampleresponse]);
  const getRatings = (arr) => {
    const likes = arr.map((el) => ({ id: el.id, rating: el.rating }));
    //console.log(likes);
    return likes;
  };
  const [likes, setLikes] = useState(getRatings(videos));

  //console.log(likes, "likes state");
  function addLike(param) {
    //console.log(param, "param inside App");
    //console.log(typeof param, "expect number");
    const updatedLikes = likes.filter((el) => el.id !== param);
    //console.log({ updatedLikes });
    const newLike = likes.filter((el) => el.id === param);
    //console.log({ newLike });

    //console.log(newLike[0], "befor change");
    newLike[0].rating++;
    //console.log(newLike[0], "after change");

    setLikes([...updatedLikes, newLike[0]]);
    //console.log({ likes });
    /*  if (likes.id === vid) {

  } */
    //setLikes(likes + 1);
  }
  function removeLike(param) {
    const updatedLikes = likes.filter((el) => el.id !== param);

    const newLike = likes.filter((el) => el.id === param);
    //console.log({ newLike });

    console.log(newLike[0], "befor change");
    newLike[0].rating--;
    //console.log(newLike[0], "after change");

    setLikes([...updatedLikes, newLike[0]]);
    //console.log({ likes });
    //setLikes(likes - 1);
  }

  const uniqueId = (array) => {
    const min = 100000; // Minimum 6-digit number (inclusive)
    const max = 999999; // Maximum 6-digit number (inclusive)
    let idArr = array.map((obj) => obj.id);

    let newId = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!idArr.includes(newId)) return newId;
    newId = Math.floor(Math.random() * (max - min + 1)) + min;
    return newId;
  };

  const uniqueRating = (array) => {
    const min = 100000; // Minimum 6-digit number (inclusive)
    const max = 999999; // Maximum 6-digit number (inclusive)
    let idArr = array.map((obj) => obj.id);

    let newRating = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!idArr.includes(newRating)) return newRating;
    newRating = Math.floor(Math.random() * (max - min + 1)) + min;
    return newRating;
  };

  const addVideo = (title, url) => {
    const newVideo = { title, url, id: uniqueId(videos), ratings: uniqueRating(videos) };
    setVideos([...videos, newVideo]);
  };

  return (
    <VideoAppContainer>
      <Heading>Add your videos</Heading>
      <VideoForm onSubmit={addVideo} />
      <VideoCardsContainer>
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            url={video.url}
            ratings={video.rating}
            addLike={addLike}
            removeLike={removeLike}
            likes={likes}
            vid={video.id}
          />
        ))}
      </VideoCardsContainer>
    </VideoAppContainer>
  );
};

export default VideoApp;

const VideoAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
`;

const Heading = styled.h1`
  margin-bottom: 1rem;
`;

const VideoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: blue;
`;
/* 

<iframe width="560" height="315" src="https://www.youtube.com/embed/SOTamWNgDKc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


<iframe width="560" height="315" src="https://www.youtube.com/embed/SOTamWNgDKc?start=4461" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

 <button onClick={addLike}>like</button>
            <button onClick={removeLike}>dislike</button> 
*/
