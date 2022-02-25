import React from "react";
import "./App.css";
import ThumbUpDown from "./ThumbUp_Down";

const ListOfVideos = (props) => {
  const deleteHandler = (Id) => {
    props.delete(Id);
  };

  return (
    <div>
      <div className="video-container">
        {props.Videos.map((item, index) => {
          return (
            <div key={index} className="visible">
              <div className="vote">
                <ThumbUpDown rating={item.rating} />
              </div>
              <p>{item.title}</p>
              <iframe
                width="300"
                height="300"
                src={item.url.replace("watch?v=", "embed/")}
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
    </div>
  );
};
export default ListOfVideos;
