import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";

const Romantic = () => {
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/2/episodes")
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Header />
      <div className='li-a-r-d'>
        <Link to="/home"><li>Action</li></Link>
        <Link to="/romantic"><li>Romantic</li></Link>
        <Link to="/documentary"><li>Documentary</li></Link>
      </div>
      <Row xs={1} md={1} className="romantic g-2" >
        {movies.map((movie, idx) => (
          <Col style={{ margin: '0 auto', width: '310px' }}>
            <Card style={{ width: '300px', height: '300px', margin: '10px' }}>
              <Card.Body style={{ height: '180px' }}>
                <Card.Img src={movie.image.medium} />
                <Card.Title>{movie.name}</Card.Title>

              </Card.Body>
              <Button>Play</Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  )
}

export default Romantic
