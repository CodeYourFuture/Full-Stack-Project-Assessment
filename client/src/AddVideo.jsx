import React, { useState } from "react";

const AddVideo = () => {
     const [clicked, setClicked] = useState(false);
     const eventHandler = () => {
       setClicked(!clicked);
     };
  return (
    <div>
      <button onClick={eventHandler} href="#" >Add Video</button>
    </div>
  );
};

export default AddVideo;
