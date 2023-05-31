import { useState, useEffect } from "react";
import styled from "styled-components";
import VideoForm from "./VideoSubForm";
import VideoCard from "./VideoCard";
//import exampleresponse from "./exampleresponse.json";

const VideoApp = () => {
  const API = "http://127.0.0.1:5000/";
  useEffect(() => {
    const getAPI = () => {
      // Change this endpoint to whatever local or online address you have
      // Local PostgreSQL Database

      fetch(`${API}videos`)
        .then((response) => {
          //console.log(response);
          return response.json();
        })
        .then((data) => {
          //setApiData(data);
          setVideos(data.videoes);
          setLoading(false);
          console.log(data);
          console.log(data.videoes);
        });
    };
    getAPI();
  }, []);
  /* const [apiData, setApiData] = useState([]); */
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState(false);
  //console.log(apiData, "all videos ");
  const [videos, setVideos] = useState([]);
  console.log(videos, "videoes");
  //const [videos, setVideos] = useState([...exampleresponse]);
  /* const getRatings = (arr) => {
    const likes = arr.map((el) => ({ id: el.id, rating: el.rating }));
    console.log(likes);
    return likes;
  };
  const [likes, setLikes] = useState(getRatings(videos)); */

  //console.log(likes, "likes state");
  function addLike(param) {
    //console.log(param, "param inside App");
    //console.log(typeof param, "expect number");
    const updatedLikes = videos.filter((el) => el.id !== param);
    console.log({ updatedLikes });
    const newLike = videos.filter((el) => el.id === param);
    console.log({ newLike });

    //console.log(newLike[0], "befor change");
    newLike[0].rating++;
    //console.log(newLike[0], "after change");
    // - - need to sort array befor spreading it back into setVideo post
    // - - or just posting it back to the server
    setVideos([...updatedLikes, newLike[0]]);
    //console.log({ likes });
    /*  if (likes.id === vid) {

  } */
    //setLikes(likes + 1);
  }
  /*   function addLike(param) {
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
     //if (likes.id === vid) {}
    //setLikes(likes + 1);
  } */
  /* function removeLike(param) {
    const updatedLikes = likes.filter((el) => el.id !== param);

    const newLike = likes.filter((el) => el.id === param);
    //console.log({ newLike });

    console.log(newLike[0], "befor change");
    newLike[0].rating--;
    //console.log(newLike[0], "after change");

    setLikes([...updatedLikes, newLike[0]]);
    //console.log({ likes });
    //setLikes(likes - 1);
  } */
  function removeLike(param) {
    const updatedLikes = videos.filter((el) => el.id !== param);

    const newLike = videos.filter((el) => el.id === param);
    //console.log({ newLike });

    console.log(newLike[0], "befor change");
    newLike[0].rating--;
    //console.log(newLike[0], "after change");

    setVideos([...updatedLikes, newLike[0]]);
    //console.log({ likes });
    //setLikes(likes - 1);
  }

  /*  const uniqueId = (array) => {
    const min = 100000; // Minimum 6-digit number (inclusive)
    const max = 999999; // Maximum 6-digit number (inclusive)
    let idArr = array.map((obj) => obj.id);

    let newId = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!idArr.includes(newId)) return newId;
    newId = Math.floor(Math.random() * (max - min + 1)) + min;
    return newId;
  };
 */
  /*  const uniqueRating = (array) => {
    const min = 100000; // Minimum 6-digit number (inclusive)
    const max = 999999; // Maximum 6-digit number (inclusive)
    let idArr = array.map((obj) => obj.id);

    let newRating = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!idArr.includes(newRating)) return newRating;
    newRating = Math.floor(Math.random() * (max - min + 1)) + min;
    return newRating;
  }; */

  /* const addVideo = (title, url) => {
    const newVideo = { title, url, id: uniqueId(videos), ratings: uniqueRating(videos) };
    setVideos([...videos, newVideo]);
  }; */
  const addVideo = (title, url) => {
    const newVideo = {
      title,
      url,
    };

    console.log("newVideo", newVideo);
    const request = new Request(`${API}videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          setUploadError(true);
          throw new Error("Whoops!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        const successUpdatedVideo = data.addedData.videoAdded;

        setVideos([...videos, successUpdatedVideo]);
      })
      .catch((error) => {
        console.log("fetch failed", error);
        setUploadError(true);
      });
    //setVideos([...videos, newVideo]);
  };

  return (
    <VideoAppContainer>
      <Heading>Add your videos</Heading>
      <VideoForm onSubmit={addVideo} />
      {uploadError ? (
        <p>video NOT added please try again</p>
      ) : (
        <p>add title and url then press submit</p>
      )}
      <VideoCardsContainer>
        {loading ? (
          <p>video loading ...</p>
        ) : (
          videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              url={video.url}
              ratings={video.rating}
              addLike={addLike}
              removeLike={removeLike}
              //likes={likes}
              vid={video.id}
            />
          ))
        )}
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
