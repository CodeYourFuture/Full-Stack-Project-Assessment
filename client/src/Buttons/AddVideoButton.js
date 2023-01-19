import React, { useState } from "react";
import AddVideos from "../Components/AddVideos";

function AddVideoButton({ videos, setVideos }) {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button onClick={handleClick} class="btn ">
        Add video
      </button>
      {toggle ? <AddVideos videos={videos} setVideos={setVideos} /> : <></>}
    </div>
  );
}

export default AddVideoButton;
