import React, { useEffect, useState } from "react";
import "./App.css";
import VideoCard from "./VideoCard";
import AddVideo from "./AddVIdeo";
import LoadingBar from "./LoadingBar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadVideos, setLoadVideos] = useState(true);
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("asc");

  //request body
  const [reqBody, setReqBody] = useState({
    title: "",
    videourl: "",
    rating: 0,
  });

  // local api endpoint
  const API_URL = "http://localhost:5001/videos";

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/?order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos([...data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Could not load data!");
        console.error("There was an error!", error);
      });
  }, [loadVideos, order]);

  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoadVideos(!loadVideos);
      })
      .catch((error) => {
        alert("Could not delete!");
        console.error("There was an error!", error);
      });
  }

  function resetForm() {
    setReqBody({
      title: "",
      videourl: "",
    });
  }

  function handleSubmit() {
    fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify({
        title: reqBody.title,
        videourl: reqBody.videourl,
        rating: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        resetForm();
        setLoadVideos(!loadVideos);
      })
      .catch((error) => {
        alert("Could not save!");
        console.error("There was an error", error);
      });
  }
  function handleRating(id, rating) {
    fetch(`${API_URL}/vote/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        rating: rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        alert("Could not save!");
        console.error("There was an error", error);
      });
  }
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "sortBy") {
      setOrder(value);
    } else {
      setReqBody({
        ...reqBody,
        [name]: value,
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <div className="m-3 title-url ">
          <AddVideo
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={() => resetForm()}
            reqBody={reqBody}
          />
        </div>
        <div className="d-flex w-25 mb-4">
          <select
            className="form-select select-col"
            aria-label="sort by rating"
            name="sortBy"
            id="sortBy"
            onChange={handleChange}
          >
            <option value="asc">Sort By: Rating Asc</option>
            <option value="desc">Sort By: Rating Desc</option>
          </select>
        </div>
        {isLoading ? (
          <LoadingBar />
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
            {videos?.map((video, key) => (
              <div className="col">
                <VideoCard
                  video_detail={video}
                  key={key}
                  handleRating={handleRating}
                  handleDelete={() => handleDelete(video.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
