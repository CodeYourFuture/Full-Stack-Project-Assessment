import "./App.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import x from "./exampleresponse.json";
// import Axios from "axios";
// import DeleteButton from "./Buttons/DeleteBtn";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import LikeBtn from "./Buttons/LikeBtn";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import DisLikeBtn from "./Buttons/DisLikeBtn";
import EmbeddedVideo from "./EmbeddedVideo";

function App() {
  const [videosData, setVideosData] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [rating, setRating] = useState(0);

  // ----fetch data here-----
  // const [..., set...] = useState([]);
  useEffect(() => {
    fetch("/videos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideosData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleVideoAdder = (e) => {
    e.preventDefault();
    const videoId = Math.floor(Math.random() * 1000000);
    const videoRate = Math.floor(Math.random() * 100000);

    const newVideo = {
      id: videoId,
      title: videoTitle,
      url: videoUrl,
      rating: videoRate,
    };

    if (newVideo.title && newVideo.url) {
      videosData.concat(newVideo);
      setVideosData([...videosData, newVideo]);
      console.log(newVideo);
    } else {
      alert("Please add videos title and url");
    }
  };

  const handleUpvote = () => {
    setRating((rating) => {
      return rating + 1;
    });
  };

  const handleDownvote = () => {
    if (rating > 0) {
      setRating((rating) => {
        return rating - 1;
      });
    }
  };

  const removeVideo = (index) => {
    const newVideo = videosData.filter((_, i) => i !== index);
    setVideosData(newVideo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <form>
        <h3>Add Video</h3>
        <MDBInput
          onChange={(e) => setVideoTitle(e.target.value)}
          className="mb-4"
          id="form5Example1"
          label="Video title"
          required
        />
        <MDBInput
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mb-4"
          type="url"
          id="form5Example2"
          label="Enter url"
        />

        <MDBBtn onClick={handleVideoAdder} className="mb-2 ml-2" type="submit">
          Add
        </MDBBtn>
        <MDBBtn className="mb-2 ml-2" type="submit">
          Cancel
        </MDBBtn>
      </form>
      <Row xs={1} md={2} className="g-4">
        {videosData.map((video, index) => (
          <Col key={index}>
            <Card key={index}>
              <Card.Title className="mb-4 mt-4">{video.title}</Card.Title>
              {/* <Card.Img variant="top" /> */}
              <EmbeddedVideo video={video} />
              <Card.Body>
                <Card.Text key={index}>
                  Votes :
                  <LikeBtn onClick={handleUpvote} />
                  <span> {rating} </span>
                  <DisLikeBtn onClick={handleDownvote} variant="secondary" />
                </Card.Text>
                <hr />
                <button onClick={() => removeVideo(index)}>Delete</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
