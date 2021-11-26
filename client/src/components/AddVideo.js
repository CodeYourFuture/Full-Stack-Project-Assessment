import React, { useState } from 'react'
import AddVideoForm from './AddVideoForm'

const AddVideo = ({ videos, setVideos }) => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        const currentClicked = !clicked;
        setClicked(currentClicked);
    }
    return (
      <div>
        <a href="#" onClick={handleClick}>
          <h3>Add Video</h3>
        </a>
        {clicked ? 
        <AddVideoForm clicked={clicked} setClicked={setClicked} videos={videos} setVideos={setVideos} /> 
        : null}
      </div>
    );
}

export default AddVideo
