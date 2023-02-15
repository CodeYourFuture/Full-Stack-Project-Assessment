import React, { useState } from "react";
///import { Container, Row, Col } from "react-bootstrap";

const SearchVideo = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="videoName"
          className="video-Control"
          placeholder="search video .."
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button type="submit" className="btn btn-primary">
          <i class="fa-light fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchVideo;

{
  /* <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={5}>
            
          </Col>
        </Row>
      </Container> */
}
