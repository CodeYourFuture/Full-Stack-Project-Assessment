import React, { useState } from "react";

const AddVideo = ({ addVideo, isAdded }) => {
  const [displayAddBox, setDisplayAddBox] = useState(false);
  const [titleValue, setTitleValue] = useState();
  const [urlValue, setUrlValue] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const onChangeTitle = (event) => setTitleValue(event.target.value);
  const onChangeUrl = (event) => setUrlValue(event.target.value);

  const handleClickButton = () => {
    setErrorMessage("");
    const url = urlValue;
    const title = titleValue;
    setTitleValue("");
    setUrlValue("");
    if (url && title) {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length === 11) {
        addVideo(title, match[2]);
        if (isAdded === 1) setErrorMessage("The video is added");
      } else {
        console.log("The url is not valid");
        setErrorMessage("The url is not valid");
      }
    } else setErrorMessage("Please enter info");
  };
  return (
    <div className="col-5 ">
      <button
        name="addVideo"
        className=" btn text-primary mt-5 mx-auto"
        onClick={() => setDisplayAddBox(true)}> Add Video
      </button>
      <div className={displayAddBox ? "m-4 d-block" : "m-4 d-none"}>
        <div className="m-4">
          <label className="m-2">Title</label>
          <input
            type="text"
            value={titleValue}
            onChange={onChangeTitle}
          ></input>
        </div>
        <div className="m-4">
          <label className="m-2">URL</label>
          <input
            type="text"
            placeholder="enter the URL"
            value={urlValue}
            onChange={onChangeUrl}
          ></input>
        </div>
        <div className="d-inline-flex">
          <button
            name="cancel"
            className="btn btn-warning mx-4"
            onClick={() => setDisplayAddBox(false)}
          >
            Cancel
          </button>
          <button
            name="addVideo"
            className="btn btn-danger "
            onClick={handleClickButton}
          >
            ADD
          </button>
        </div>
        <p>
          <label className="text-danger m-3">{errorMessage}</label>
        </p>
      </div>
    </div>
  );
};

export default AddVideo;
