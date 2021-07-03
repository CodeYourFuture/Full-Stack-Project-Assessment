import React, { useContext } from "react";
import { ThumbUp, ThumbDown, DeleteForever } from "@material-ui/icons";
import { VideoContext } from "../contexts/VideoContext";
import axios from "axios";

const apiUrl = "http://localhost:5000";

function VideoCard({ data }) {
  const { dispatch } = useContext(VideoContext);

  function handleDelete() {
    axios
      .delete(`${apiUrl}/${data.id}`)
      .then((res) => {
        axios(`${apiUrl}/`)
          .then((res) => dispatch({ type: "LOAD", payload: res.data }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function handleThumb(plus) {
    axios
      .put(`${apiUrl}/${data.id}`, {
        "rating": data.rating + plus,
      })
      .then((res) => {
        console.log(res.data);
        axios(`${apiUrl}/`)
          .then((res) => dispatch({ type: "LOAD", payload: res.data }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      key={data.id}
      className="card col-12 col-md-3 m-3 p-0"
      style={{ width: "16rem" }}
    >
      <iframe
        className="card-img-top"
        src={`https://www.youtube.com/embed/${data.url.split("watch?v=")[1]}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={data.title}
      />

      <div className="card-body justify-content-between">
        <h5 className="card-title">{data.title}</h5>
        <div className="d-flex justify-content-between">
          <div onClick={() => handleThumb(1)}>
            <ThumbUp />
          </div>
          <h6 className="card-text">Rating: {data.rating}</h6>
          <div onClick={() => handleThumb(-1)}>
            <ThumbDown />
          </div>
        </div>
        <div onClick={handleDelete}>
          <DeleteForever fontSize="large" color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
