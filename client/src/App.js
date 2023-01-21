import "./App.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import videosData from "./exampleresponse.json";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

const x = [
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
];

function App() {
  const [videosData, setVideosData] = useState(x);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  // const [rating, setRating] = useState(x.rating);

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

    // if (newVideo.title && newVideo.url) {
    videosData.concat(newVideo);
    setVideosData([...videosData, newVideo]);
    console.log(newVideo);
    // } else {
    //     alert("Please add videos title and url");
    //   }
  };

  function handleUpvote(rating) {
    console.log(rating);
  }

  // function handleDownvote(x) {
  //   console.log(x.rating);
  // }

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
          <Col>
            <Card>
              <Card.Img variant="top" />
              <iframe
                className="embeddedVideo"
                title={video.title}
                height={"300"}
                src={video.url.replace("watch?v=", "embed/")}
                alt={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
              />
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Card.Text>
                  Votes :
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      onClick={handleUpvote}
                      variant="secondary"
                    >
                      {" "}
                      &#128077;{" "}
                    </Button>
                    <span> {video.rating} </span>
                    <Button variant="secondary"> &#128078; </Button>
                  </ButtonGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
