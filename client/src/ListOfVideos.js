import React, { useState, useEffect } from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
import "./App.css";
// import example from "./exampleresponse.json";

const ListOfVideos = (props) => {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const [oneVideo, setOneVideo] = useState([]);

  const clickLike = () => {
    setLike((like) => like + 1);
  };
  const clickDisLike = () => {
    setDisLike((disLike) => disLike + 1);
  };

  const deleteHandler = (Id) => {
    setOneVideo(oneVideo.filter((item) => item.id !== Id));
  };
  const videosData = () => {
    fetch("http://127.0.0.1/5050") //try https://video-rec.herokuapp.com
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        //  throw Error("Can not load the data");
      })
      .then((data) => {
        console.log(data);
        setOneVideo(data);
      });
    //  .catch((err)=>{
    //   console.log(err.message);
    //   setErr(true);
    // });
  };
  useEffect(() => {
    videosData();
  }, []);
  console.log(oneVideo);
  return (
    <div className="video-container">
      {oneVideo.map((item, index) => {
        return (
          <div key={index} className="visible">
            <div className="vote">
              <BsFillHandThumbsUpFill onClick={clickLike} className="thumb" />
              <span>{like}</span>
              <h5>Vote</h5>

              <BsFillHandThumbsDownFill
                onClick={clickDisLike}
                className="thumb"
              />
              <span>{disLike}</span>
            </div>

            <p>{item.title}</p>
            <iframe
              width="300"
              height="300"
              src={item.vurl.replace("watch?v=", "embed/")}
              // src={item.vurl.replace("watch?v=", "embed/")} when try:https://video-rec.herokuapp.com
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => deleteHandler(item.id)}
              type="button"
              className="btn btn-primary mt-3"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default ListOfVideos;
