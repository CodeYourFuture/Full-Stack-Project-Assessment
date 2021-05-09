import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";
import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbsUp);
library.add(faThumbsDown);

const MiniYouTube = () => {
  const [searchInput, setSearchInput] = useState([]);
  const handleSearchInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value.toLowerCase());
  };
  return (
    <div>
      <div className="add-button-and-search-wrapper">
        <Button className="add-button" variant="primary">
          Add Video
        </Button>
        <div key="input-form" className="search-input-wrapper">
          <i class="fas fa-search"></i>
          <input
            key="search-input "
            type="text"
            className="search-bar"
            placeholder="Search for a video ..."
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>
      </div>

      <div className="display-wrapper">
        {exampleresponse.map((response) => {
          return (
            <div className="video-and-title">
              <div className="header-rating-wrapper">
                <h4>{response.title}</h4>
                {/* <h4>Rating:{response.rating}</h4> */}
              </div>
              <div className="video-container">
                <ReactPlayer
                  width="560"
                  height="315"
                  className="embedded-video"
                  url={response.url.toString()}
                />
              </div>
              <div>
                <h4>Rating:{response.rating}</h4>
                <div className="buttons-container">
                  <FontAwesomeIcon
                    className="link-danger dislike"
                    icon={"thumbs-down"}
                  />
                  <Button variant="danger">Delete</Button>
                  <FontAwesomeIcon
                    className="link-danger like"
                    icon={"thumbs-up"}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniYouTube;
