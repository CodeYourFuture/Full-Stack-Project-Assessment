import React, { useState, use Effect } from "react";

const AddVids = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
 

  function addVideo() {

  }

  //fetch data
  // useEffect(()=> {
  // fetch("http://127.0.0.1:5000")
  //       .then((res) => res.json())
  //       .then((props) => addVideos(props)
  // },[])


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
