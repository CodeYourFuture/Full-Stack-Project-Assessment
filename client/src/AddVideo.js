import React, { useState } from "react";

const AddVideo = ({addVideo}) => {
  const [displayAddBox, setDisplayAddBox] = useState(false);
  const [titleValue, setTitleValue] = useState();
  const [urlValue, setUrlValue] = useState();
  const onChangeTitle = (event) => setTitleValue(event.target.value);
  const onChangeUrl = (event) => setUrlValue(event.target.value);
  const handleClickButton = () => {
      const urlId = urlValue.split("=");
    addVideo(titleValue, urlId[1]);
  };
  return (
    <div className="col-6">
      <button
        name="addVideo"
        className=" btn text-primary mt-5 mx-auto"
        onClick={() => setDisplayAddBox(true)}
      >
        Add Video
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
      </div>
    </div>
  );
};

export default AddVideo;
