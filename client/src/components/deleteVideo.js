import React from 'react';
import VideoFrame from './videoFrames.js';
const DeleteVideo = (props) =>{
    return <button onClick = {props.handleDelete} >DELETE</button>    
}
export default DeleteVideo;