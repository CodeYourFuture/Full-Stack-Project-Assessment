import { useState, useEffect } from "react";
import styled from "styled-components";
import VideoForm from "./VideoSubForm";
import VideoCard from "./VideoCard";

const VideoApp = () => {
  const API = "http://127.0.0.1:5000/";
  const getAPI = () => {
    fetch(`${API}videos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideos(data.videoes);
        setLoading(false);
        console.log(data);
        console.log(data.videoes);
      });
  };
  useEffect(() => {
    getAPI();
  }, []);

  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState(false);

  const [videos, setVideos] = useState([]);
  console.log(videos, "videoes");

  function addLike(param) {
    const newLike = videos.filter((el) => el.id === param);
    newLike[0].rating++;
    updateVideo(newLike[0].rating, param);
    getAPI();
  }

  function removeLike(param) {
    const newLike = videos.filter((el) => el.id === param);
    newLike[0].rating--;
    updateVideo(newLike[0].rating, param);
    getAPI();
  }

  const addVideo = (title, url) => {
    const newVideo = {
      title,
      url_link: url,
    };

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
        const successUpdatedVideo = data.addedData.videoAdded;
        setVideos([...videos, successUpdatedVideo]);
      })
      .catch((error) => {
        console.log("fetch failed", error);
        setUploadError(true);
      });
  };
  const updateVideo = (rating, id) => {
    const updateVid = {
      rating,
      id,
    };

    const request = new Request(`${API}videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateVid),
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Whoops!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        getAPI();
      })
      .catch((error) => {
        console.log("fetch failed UPDATE", error);
      });
  };

  const deleteVideo = (vidId) => {
    const request = new Request(`${API}videos/${vidId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          console.log("resoponse not ok");
          throw new Error("Whoops!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        getAPI();
      })
      .catch((error) => {
        console.log("fetch failed", error);
        setUploadError(true);
      });
  };

  const getVideo = (vidId) => {
    const request = new Request(`${API}videos/${vidId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          console.log("resoponse not ok");
          throw new Error("Whoops!");
        }
        return response.json();
      })
      .then((data) => {
        const successUpdatedVideo = data.videoes;
        setVideos([successUpdatedVideo]);
      })
      .catch((error) => {
        console.log("fetch failed get 1", error);
      });
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
              url={video.url_link}
              ratings={video.rating}
              addLike={addLike}
              removeLike={removeLike}
              vid={video.id}
              deleteVid={deleteVideo}
              getVid={getVideo}
            />
          ))
        )}
      </VideoCardsContainer>
      <button onClick={() => getAPI()}>get all</button>
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
