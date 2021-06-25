import { useState } from "react";

const AddVideos = ({ handleAddVideo }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  return (
    <div>
      <button onClick={() => setIsClicked(true)}>Add Videos</button>
      <div className={isClicked ? " d-block" : "d-none"}>
        <input onChange={(event) => setTitle(event.target.value)}></input>
        <input onChange={(event) => setUrl(event.target.value)}></input>
        <button onClick={() => setIsClicked(false)}>Cancel</button>
        <button onClick={() => handleAddVideo(title, url)}>Add</button>
      </div>
    </div>
  );
};

export default AddVideos;
