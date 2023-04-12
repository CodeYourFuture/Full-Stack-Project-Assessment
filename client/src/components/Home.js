import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "./Footer";
import Header from "./Header.js";

const Home = () => {
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/82/episodes")
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Header />
      <div className="li-a-r-d">
        <Link to="/home">
          <li>Action</li>
        </Link>
        <Link to="/romantic">
          <li>Romantic</li>
        </Link>
        <Link to="/documentary">
          <li>Documentary</li>
        </Link>
      </div>
      <div className="h5">
        <h6>Gallery movies</h6>
      </div>
      <Row xs={1} md={1} className="actin g-2">
        {movies.map((movie, idx) => (
          <Col style={{ margin: "10px auto", width: "310px", height: "310px" }}>
            <Card
              style={{
                padding: "10px",
                width: "300px",
                height: "300px",
                margin: "15px",
              }}
            >
              <Card.Body style={{ height: "180px", position: "relative" }}>
                <Card.Img src={movie.image.medium} />
                <Card.Title>{movie.name}</Card.Title>
              </Card.Body>
              <Button>addList</Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
};
export default Home;
