import React, { useState, useEffect } from "react";
import SingleVideo from "./SingleVideo";
import { Container, Row, Col } from "react-bootstrap";
import { AddCircleOutline, HighlightOff, Search, Publish, ArrowCircleUp, ArrowCircleDown } from "@mui/icons-material";
import { IconButton } from "@mui/material";


const AddVideo = ({ getVideos, setVideos, videos, urlToFetch, videoOrder, setVideoOrder }) => {
  const [addTitle, setAddTitle] = useState("");
  const [addUrl, setAddUrl] = useState("");
  const [validInput, setValidInput] = useState("");
  const [findVideoInput, setFindVideoInput] = useState("");
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showFindVideo, setShowFindVideo] = useState("");
  useEffect(() => {
    getVideos(videoOrder);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addVideoToVideos = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const newVideoElements = {};
    for (let video of formElements) {
      const videoName = video.name;
      const videoValue = video.value;
      newVideoElements[videoName] = videoValue;
    }
    const res = await fetch(`${urlToFetch}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVideoElements),
    });
    const data = await res.json();
    setValidInput(data.msg);
    setAddTitle("");
    setAddUrl("");
    getVideos(videoOrder);
  };

  const findVideo = (e) => {
    e.preventDefault();
    const videoId = e.target[0].value;
    if (videoId !== "") {
      fetch(`${urlToFetch}${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        setFindVideoInput(data.msg);
        data.videos && setVideos(data.videos);
      });
    }
    return
  };
  const showAddVideoInput = (
    <>
      <form onSubmit={addVideoToVideos}>
        
        <label>
          Title
          <input type="text" id="title" name="title" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} />
        </label>
        <label>
          Url
          <input type="text" id="url" name="url" value={addUrl} onChange={(e) => setAddUrl(e.target.value)} />
        </label>
        <IconButton aria-label="add video" type="submit">
          <Publish color="primary" />
        </IconButton>
      </form>
      <IconButton
        aria-label="close"
        onClick={() => {
          setShowAddVideo(false);
        }}
      >
        <HighlightOff color="primary" />
      </IconButton>
    </>
  );


  return (
    <>
      <section className="add-video-section">
        {/* <span>Sort:</span> */}
        Sort:
        <IconButton
          aria-label="sort ascending"
          onClick={() => {
            setVideoOrder("ASC");
            getVideos("ASC");
          }}
        >
          <ArrowCircleUp color="primary" />
        </IconButton>
        <IconButton
          aria-label="sort descending"
          onClick={() => {
            setVideoOrder("DESC");
            getVideos("DESC");
          }}
        >
          <ArrowCircleDown color="primary" />
        </IconButton>
        <form onSubmit={findVideo}>
          <input
            type="number"
            id="videoId"
            name="videoId"
            placeholder="Video Id"
            value={showFindVideo}
            onChange={(e) => setShowFindVideo(e.target.value)}
          />
          <IconButton aria-label="search" type="submit">
            <Search color="primary" />
          </IconButton>
          {showFindVideo !== "" && (
            <IconButton
              aria-label="close"
              onClick={() => {
                setShowFindVideo("");
                getVideos(videoOrder);
              }}
            >
              <HighlightOff color="primary" />
            </IconButton>
          )}
        </form>
        Add video
        <IconButton aria-label="add video" onClick={() => setShowAddVideo(true)}>
          <AddCircleOutline color="primary" />
        </IconButton>
        {showAddVideo && showAddVideoInput}
        <p>
          {findVideoInput}
          {validInput}
        </p>
      </section>
      {/* {showFindVideo && <button onClick={getVideos}>Show All</button>} */}
      <section className="show-videos">
        <Container fluid>
          <Row>
            {videos.map((video) => (
              <Col xs={12} sm={6} lg={4} xl={3} key={video.id}>
                <SingleVideo video={video} urlToFetch={urlToFetch} getVideos={getVideos} videoOrder={videoOrder} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddVideo;
