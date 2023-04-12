import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Package from "../data/exampleresponse.json";
import OrderResult from "./OrderResult";
import ReactPlayers from "./ReactPlayers";
import Header from "./Header.js";
import { FiThumbsDown } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";
import Footer from "./Footer";

const TheVideos = () => {
  const [allVoted, setAllVoted] = useState(0);
  const [subVoted, setSubVoted] = useState(0);
  const [video, setVideo] = useState(Package);
  const [allVideo, setAllVideo] = useState([]);
  const [allVideoId, setAllVideoId] = useState([]);
  const [allVideoRat, setAllVideoRat] = useState([]);

  const [videos, setVideos] = useState("");
  const handleSort = () => {
    let sorted = video.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else {
        return null;
      }
    });
    console.log(sorted);
    setAllVideo(sorted);
  };
  const ratingSort = () => {
    let sorted = video.sort((a, b) => {
      if (a.rating < b.rating) {
        return -1;
      } else {
        return null;
      }
    });
    console.log(sorted);
    setAllVideoRat(sorted);
  };
  const idSort = () => {
    let sorted = video.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else {
        return null;
      }
    });
    console.log(sorted);
    setAllVideoId(sorted);
  };

  const sumVote = (sum) => {
    let sumRat = video.filter((val) => {
      if (val.rating === 0) {
        return val.rating;
      } else if (val.rating === sum) {
        return setSubVoted(val.rating++);
      } else {
        return null;
      }
    });
    return setSubVoted(sumRat);
  };

  const buttonClick = (rat) => {
    let subRat = video.filter((val) => {
      if (val.rating === 0) {
        return val.rating;
      } else if (val.rating === rat) {
        return setSubVoted(val.rating--);
      } else {
        return null;
      }
    });
    return setSubVoted(subRat);
  };
  function RemoveId(ids) {
    let newProps = video.filter((prop) => {
      console.log(prop.id);
      return prop.id !== ids ? prop : null;
    });
    setVideo(newProps);
  }
  return (
    <div className="div2">
      <Header />
      <Navbar
        variant="dark"
        bg="dark"
        expand="md"
        style={{ margin: "0 auto", width: "70vw" }}
      >
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Sort By"
                menuVariant="dark"
              >
                {" "}
                <NavDropdown.Item>
                  <Button onClick={handleSort}>Title</Button>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Button onClick={ratingSort}>Rating</Button>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Button onClick={idSort}>Id</Button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <OrderResult />

      <label id="search">
        <input
          id="search"
          name="search"
          value={videos}
          placeholder="search you video"
          onChange={(e) => setVideos(e.target.value)}
        />
      </label>
      <div className="addVideos">
        {video
          .filter((val) => {
            if (allVoted === "") {
              return val;
            } else if (val.title.toLowerCase().indexOf(videos) > -1) {
              return val;
            } else {
              return null;
            }
          })
          .map((lik, i) => {
            return (
              <div className="allVideos" key={i}>
                <h2> {lik.title}</h2>
                <button
                  className="clickButton  btn btn-primary"
                  onClick={() => sumVote(lik.rating)}
                  type="button"
                >
                  <i>
                    <FiThumbsUp />
                  </i>
                </button>
                {lik.rating}
                <button
                  onClick={() => buttonClick(lik.rating)}
                  type="button"
                  className="btn btn-primary"
                >
                  <i>
                    <FiThumbsDown />
                  </i>
                </button>

                {<ReactPlayers orl={lik.url} />}
                <button
                  onClick={() => RemoveId(lik.id)}
                  className="btn btn-primary"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default TheVideos;
