import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";
import ReactPlayer from "react-player";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbsUp);
library.add(faThumbsDown);
const MiniYoutube = () => {
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
            <h5>{response.title}</h5> 
            <div className="Rating">
            <FontAwesomeIcon
                    className="link-danger like"
                    icon={"thumbs-up"}
                  />
               <h5>Rating:{response.rating}</h5>   
             <FontAwesomeIcon
                    className="link-danger dislike"
                    icon={"thumbs-down"}
                  />

            </div>
                 
            <div className="video-container">
              <ReactPlayer
                width="20rem"
                height="20rem"
                className="embedded-video"
                url={response.url.toString()}
              />
            </div>
          <div>
                
                <div className="buttons-container">
                  <Button variant="danger">Delete</Button>
                </div>
              </div>
           </div> 
        );
      })}
    </div>
  </div>
  );
};

export default MiniYoutube;