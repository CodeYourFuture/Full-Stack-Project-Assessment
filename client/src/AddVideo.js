import React, { useState, useEffect } from "react";
import SingleVideo from "./SingleVideo";
import { Container, Row, Col } from "react-bootstrap";

const AddVideo = ({ getVideos, setVideos, videos, urlToFetch }) => {
  const [addTitle, setAddTitle] = useState("");
  const [addUrl, setAddUrl] = useState("");
  const [validInput, setValidInput] = useState("");
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showFindVideo, setShowFindVideo] = useState(false);
useEffect(() => {
  getVideos();
}, []);
  
  const addVideoToVideos = async e => {
    e.preventDefault();
    const formElements = e.target.elements;
    const newVideoElements = {};
    for (let video of formElements) {
      console.log(video)
      const videoName = video.name;
      const videoValue = video.value;
      newVideoElements[videoName] = videoValue;
    }
    const res = await fetch(`${urlToFetch}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVideoElements)
    });
    const data = await res.json();
    setValidInput(data.msg);
    setAddTitle("");
    setAddUrl("");
    getVideos();
  };

  const findVideo = (e) => {
    e.preventDefault()
    const videoId = e.target[0].value;
    fetch(`${urlToFetch}${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos([data]);
      });
  }
  const showAddVideoInput = (
    <>
      <form onSubmit={addVideoToVideos}>
        <p>{validInput}</p>
        <label>
          Title
          <input type="text" id="title" name="title" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} />
        </label>
        <label>
          Url
          <input type="text" id="url" name="url" value={addUrl} onChange={(e) => setAddUrl(e.target.value)} />
        </label>
        <button>Add</button>
      </form>
      <button onClick={() => setShowAddVideo(false)}>Cancel</button>
    </>
  );

  const showFindVideoInput = (
    <>
      <form onSubmit={findVideo}>
        <p>{validInput}</p>
        <label>
          Video Id
          <input type="number" id="videoId" name="videoId" value={showFindVideo} onChange={(e) => setShowFindVideo(e.target.value)} />
        </label>
        <button>Find</button>
      </form>
      <button onClick={() => { setShowFindVideo(false); getVideos()}}>Cancel</button>
    </>
  );

  return (
    <>
      <button onClick={() => setShowAddVideo(true)}>Add Video</button>
      {showAddVideo && showAddVideoInput}
      <button onClick={() => setShowFindVideo(true)}>Find Video</button>
      {showFindVideo && showFindVideoInput}
      {/* {showFindVideo && <button onClick={getVideos}>Show All</button>} */}
      <section className="show-videos">
        <Container fluid>
          <Row>
            {videos
              .map((video) => (
                <Col xs={12} sm={6} lg={4} xl={3} key={video.id}>
                  <SingleVideo video={video} urlToFetch={urlToFetch} getVideos={getVideos} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddVideo;
