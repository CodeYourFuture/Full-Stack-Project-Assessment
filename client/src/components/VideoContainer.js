import React from "react";
import DeleteButton from "./DeleteButton";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

const VideoContainer = ({ ExampleResponse }) => {
  return (
    <div>
      {ExampleResponse.map((sample, index) => (
        <div key={index}>
          <h4>{sample.title}</h4>
          <div>
            <FaThumbsUp />
            <h3>0 VOTE</h3>
            <FaThumbsDown />
          </div>
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${sample.url.substring(
                sample.url.length - 11
              )}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h5>{sample.rating}</h5>
          <div>
            <DeleteButton />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoContainer;
