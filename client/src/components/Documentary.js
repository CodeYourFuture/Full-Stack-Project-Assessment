import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Documentary = () => {
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/1/episodes")
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
      <Row xs={1} md={1} className="document g-2">
        {movies.map((movie, idx) => (
          <Col className="d-col">
            <Card d-className="d-cord">
              <Card.Body className="d-bdy">
                <Card.Img src={movie.image.medium} />
                <Card.Title>{movie.name}</Card.Title>
                <Button>Play</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
};

export default Documentary;
