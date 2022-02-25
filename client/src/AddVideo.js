import React, { useState } from "react";
const AddVideo = (props) => {
  const [clicked, setClicked] = useState(false);
  const [addData, setAddData] = useState({
    id:  0,
    url: "",
    title: "",
    rating: 0,
  });
  const ChangeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const id = Math.floor(Math.random() * 50000) + 100;
    setAddData({ ...addData, [inputName]: inputValue,id });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(addData);
    
    props.onAddVideo(addData);
    setAddData({
      url: "",
      title: "",
    });
  };
  const clickHandler = () => {
    setClicked(true);
    if (clicked) {
      setClicked(false);
    }
  };

  return (
    <div>
      <button onClick={clickHandler} className={"addButton  form-video"}>
        Add Video
      </button>
      <div className={clicked ? "form-video" : "non-visible"}>
        <form onSubmit={submitHandler}>
          <div className="form-group ml-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={ChangeHandler}
              value={addData.title}
              placeholder="Video Title"
            ></input>
          </div>
          <div className="form-group ml-2">
            <label htmlFor="video-link">URL</label>
            <input
              type="url"
              id="video-link"
              name="url"
              onChange={ChangeHandler}
              value={addData.url}
              placeholder="YouTube embed URL"
            ></input>
          </div>
          <button className="btn btn-primary ml-2" >Add</button>
        </form>
      </div>
    </div>
  );
};
export default AddVideo;
