import React, { useState } from "react";

const Add = ({ allData, handleSet }) => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleAdd = () => {
    setToggle(!toggle);
  };

  const validationCheck = () => {
    setErrMsg("");
    let result = true;
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
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

    let date = new Date();
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    // let hour = date.getHours();
    // let min = date.getMinutes();
    // let second = date.getSeconds();
    // console.log(hour, min, second)
    submitEvent.preventDefault();
    if (validationCheck()) {
      const newId = Math.max(...allData.map((video) => video.id)) + 1;

      const newVideo = {
        id: newId,
        title: title,
        url: url,
        rating: 0,
        // time: hour + ":" + min + ":" + second,
        // date: String(date)
        date: date.toLocaleDateString("en-UK", options)
      };
      handleSet(newVideo);
      resetAddForm();
      console.log(newVideo);
    }
  };
  const resetAddForm = () => {
    setToggle(!toggle);
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <button onClick={handleAdd}>Add a new video</button>
      <div className={toggle ? "display-block" : "display-none"}>
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
          />
          <label htmlFor="url">URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            id="url"
          />
          <button type="submit">Save</button>
        </form>
        <p>{errMsg}</p>
      </div>
    </div>
  );
};

export default Add;
