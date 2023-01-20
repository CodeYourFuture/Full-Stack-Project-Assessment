import React, { useState } from "react";
import AddNewVideo from "../Components/AddNewVideo";

function AddVideoButton({ addNewVideoFunction }) {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button onClick={handleClick} className="btn ">
        Add video
      </button>
      {toggle ? <AddNewVideo addNewVideo={addNewVideoFunction} /> : <></>}
    </div>
  );
}

export default AddVideoButton;
