import React, { useState } from "react";
import AddVideos from "../Components/AddVideos";

function AddVideoButton({videos}) {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button onClick={handleClick} class="btn ">
        Add video
      </button>
      {toggle ? <AddVideos /> : <></>}
    </div>
  );
}

export default AddVideoButton;
