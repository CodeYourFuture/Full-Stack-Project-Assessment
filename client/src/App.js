import AddVideo from "./componets/Add-Video/AddVideo";
import SingleVideo from "./componets/Single-Video/SingleVideo";
import Search from "./componets/Search-Bar/Search";
import OrderButton from "./componets/OrderButtons.js";
import axios from "axios";

import "./App.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [originalState, setOriginalState] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAsc, setIsAsc] = useState(false);

 
  const toggleButton = () => {
    setIsAsc((prevIsAsc) => !prevIsAsc);
  };
  
  
  useEffect(() => {
    const fetchURL = `http://ec2-18-171-148-184.eu-west-2.compute.amazonaws.com:5000/videos?order=${isAsc ? "asc" : "desc"}`;
    console.log("Fetch URL:", fetchURL);
  
    fetch(fetchURL)
      .then((res) => {
        if (res.status === 500) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setVideos(data);
        setLoading(false);
        setOriginalState(data);
      })
      .catch((error) => setError(true));
  }, [isAsc]);
  
  const removeVideo = (id) => {
    axios.delete(`http://ec2-18-171-148-184.eu-west-2.compute.amazonaws.com:5000/videos/${id}`).then((res) => {
      if (res.status === 200) {
        axios.get("http://ec2-18-171-148-184.eu-west-2.compute.amazonaws.com:5000/videos").then((res) => {
          setVideos(res.data);
        });
      }
    });
  };

  

  return (
    <div className="App bg-light ">
      <header className="App-header">
        <h1 style={{ backgroundColor: "green" }}>Video Recommendation</h1>
        <Container className="mt-3">
          <Row>
            <Col md>
              <AddVideo setVideos={setVideos} />
              <OrderButton  toggleButton={toggleButton}/>
            </Col>
            <Col md>
              <Search
                setVideos={setVideos}
                videos={videos}
                originalState={originalState}
              />
            </Col>
          </Row>
        </Container>
      </header>

      <main>
        <Container>
          <Row xs={1} sm={2} md={3}>
            {loading && <span>Loading, please wait until video loads...</span>}
            {error && <span>{`There is a problem fetching the  data `}</span>}
            {videos.length > 0 &&
              videos.map((video) => {
                return (
                  <div key={video.id}>
                    <SingleVideo
                      id={video.id}
                      title={video.title}
                      url={video.url.replace("watch?v=", "embed/")}
                      ratingData={video.rating}
                      deleteVideo={removeVideo}
                    />
                  </div>
                );
              })}
          </Row>
        </Container>
      </main>
      <footer >
    <h4 > Designed by Mesgna Mehari Woldeab</h4>
      </footer>
    </div>
  );
}

export default App;
