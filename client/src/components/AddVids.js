import React, { useState } from "react";

const AddVids = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function addVideo() {}
  console.log(title)

  return (
    <>
      <button onClick={addVideo}>Add Video</button>
      <form>
        <label>Title</label>
        <input onChange={(e) => setTitle(e.target.value)} type="text" />

        <label>URL</label>
        <input onChange={(e) => setUrl(e.target.value)} type="text" />
      </form>
    </>
  );
};

export default AddVids;
