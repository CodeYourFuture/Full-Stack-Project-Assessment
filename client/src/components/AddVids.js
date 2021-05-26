import React from "react";

const AddVids = (props) => {

  function addVideo() {
    props.addVideo({
      
        "id": 523523,
        "title": "Never Gonna Give You Up",
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "rating": 25
      
    })
  }

  return (
    <>
      <button onClick={addVideo}>Add Video</button>
      <form>
        <label>Title</label>
        <input type="text"></input>

        <label>URL</label>
        <input type="text"></input>
      </form>
    </>
  );
};

export default AddVids;
