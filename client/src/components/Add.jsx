import React, { useState } from "react";
import axios from "axios";

const Add = ({ allData, handleSet, loadData }) => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleAdd = () => {
    setToggle(!toggle);
  };

  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) return true;
    return false;
  }

  const validationCheck = () => {
    setErrMsg("");
    let result = true;
    let match = matchYoutubeUrl(url);
    if (title.length === 0 && (url === undefined || url === "" || !match)) {
      setErrMsg("Please make sure you have entered both title and URL");
      result = false;
    } else if (title.length === 0) {
      setErrMsg("Please enter a valid title");
      result = false;
    } else if (url === undefined || url === "" || !match) {
      setErrMsg("Please enter a valid youtube URL");
      result = false;
    }
    return result;
  };
  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    if (validationCheck()) {
      //const newId = Math.max(...allData.map((video) => video.id)) + 1;

      const newVideo = {
        title: title,
        url: url,
      };
      try {
        axios
          .post(`https://videoss-db.herokuapp.com/`, newVideo)
          .then(() => {
            loadData();
            resetAddForm();
          })
          .catch((err) => setErrMsg(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetAddForm = () => {
    setToggle(!toggle);
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <button className="btn btn-success m-2" onClick={handleAdd}>
        Add a new video
      </button>
      <div className={toggle ? "display-block" : "display-none"}>
        <form className="d-flex justify-content-center" onSubmit={handleSubmit} action="">
          <div className="w-25 ">
            <div className="col">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
              />
            </div>
            <div className="col">
              <label htmlFor="url">URL</label>
              <input
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                id="url"
              />
            </div>
            <button className="btn btn-primary m-2" type="submit">
              Save
            </button>
          </div>
        </form>
        <p>{errMsg}</p>
      </div>
    </div>
  );
};

export default Add;
