import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
import {Container, Row, Col} from 'react-bootstrap'
import moment from "moment"

const AddVideo = ({ setVideos, videos }) => {
  const [addTitle, setAddTitle] = useState("");
  const [addUrl, setAddUrl] = useState("");
  const [validInput, setValidInput] = useState("");
  const [showAddVideo, setShowAddVideo] = useState(false);

  

  const validYoutubeUrlPattern = new RegExp(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
  );
  const addVideoToVideos = (e) => {
    e.preventDefault();
    if (addTitle === "" || !addUrl.match(validYoutubeUrlPattern)) {
      return addTitle === ""
        ? setValidInput("Please add the video title")
        : addUrl === ""
        ? setValidInput("Please enter a Youtube Url")
        : setValidInput("Please enter a valid YouTube Url");
    } else {
      setVideos(
        videos.concat({
          id: generateRandomId(videos),
          title: addTitle,
          url: addUrl,
          rating: 0,
          dateAdded: moment().format("MMMM Do YYYY, h:mm:ss a"),
        })
      );
      console.log(videos);
      setValidInput("Your video has been added");
      setAddTitle("");
      setAddUrl("");
    }
  };
  const generateRandomId = (arr) => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const alreadyHasId = arr.some((video) => video.id === randomId);
    if (alreadyHasId) {
      generateRandomId(arr);
    } else {
      return randomId;
    }
  };
  const showAddVideoInput =  <><form onSubmit={addVideoToVideos}>
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
      <button onClick={() => setShowAddVideo(false)}>Cancel</button></>
  
  return (
    <>
      <button onClick={() => setShowAddVideo(true)}>Add Video</button>
      {showAddVideo && showAddVideoInput}
      <section className="show-videos">
        <Container fluid>
          <Row>
            {videos
              .sort((a, b) => b.rating - a.rating)
              .map((video, index) => (
                <Col xs={12} sm={6} lg={4} xl={3} key={video.id}>
                  <SingleVideo video={video} index={index} videos={videos} setVideos={setVideos} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddVideo;
