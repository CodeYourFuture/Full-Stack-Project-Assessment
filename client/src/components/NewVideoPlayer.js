import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Reactplayer from "react-player";
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const NewVideoPlayer = ({ rl, i, el }) => {
  let randomNumbers = Math.floor(Math.random() * 100 + 1);
  const [random, setRandom] = useState(randomNumbers);
  const randomVoteUp = () => {
    setRandom(random + 1);
  };
  const randomVoteDown = () => {
    setRandom(random - 1);
  };
  const deleteVideo = (elem) => {
    let deleteIndex = elem.filter((elm, index) => {
      console.log(elm);
      console.log(index);

      return index !== 0 ? null : elm;
    });
    console.log(deleteIndex);
    return deleteIndex;
  };
  return (
    <div className="newVideos">
      <div className="btnHead">
        {el}
        <span className="btnSpan">
          <Button onClick={randomVoteDown}>
            {" "}
            <FiThumbsUp />{" "}
          </Button>
          {random}
          <Button onClick={randomVoteUp}>
            {" "}
            <FiThumbsDown />{" "}
          </Button>
        </span>
      </div>

      <Reactplayer controls url={rl} width="400px" height="250px" />
      <Button
        type="button"
        onClick={() => deleteVideo(i)}
        style={{ backgroundColor: "red" }}
        className="buton"
      >
        {" "}
        <RiDeleteBin5Line />{" "}
      </Button>
    </div>
  );
};

export default NewVideoPlayer;
