import React from "react";

const AddVids = (props) => {
  function addVideo() {
    props.addVideo({
      id: props.id,
      title: props.title,
      url: props.url,
      rating: props.rating,
    });
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
