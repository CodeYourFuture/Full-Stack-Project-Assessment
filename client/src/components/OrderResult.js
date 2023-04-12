import React, { useState } from "react";
import NewVideoPlayer from "./NewVideoPlayer";

const OrderResult = () => {
  const [titleAndUrl, setTitleAndUrl] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const clickHandle = (e) => {
    console.log(e.target.value);
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "url") {
      console.log(e.target.value);
      setUrl(e.target.value);
    }
  };
  function buttonAddVideo() {
    let newVideo = {
      title: title,
      url: url,
    };
    let updateNewVideo = [...titleAndUrl];
    updateNewVideo.push(newVideo);
    console.log(updateNewVideo);
    setTitleAndUrl(updateNewVideo);
    setTitle("");
    setUrl("");
  }

  function submit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/datas/", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        url: url,
      }),
      headers: { "content-type": "application/json" },
    });
  }

  return (
    <div className="the-button">
      <div className="form">
        <form className="form-add" onSubmit={submit}>
          <label id="firstId">
            <input
              id="lable-1"
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={clickHandle}
              required
            />
          </label>
          <br />
          <label id="secondId">
            <input
              id="lable-2"
              type="text"
              name="url"
              placeholder="url"
              value={url}
              onChange={clickHandle}
              required
            />
          </label>

          <br />
          <button
            onClick={buttonAddVideo}
            type="submit"
            className="secondButton btn btn-primary"
          >
            Add Video
          </button>
        </form>
      </div>
      {titleAndUrl.map((elem, index) => {
        return (
          <div key={index} className="newVideoPlayer">
            <NewVideoPlayer i={titleAndUrl} el={elem.title} rl={elem.url} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderResult;
