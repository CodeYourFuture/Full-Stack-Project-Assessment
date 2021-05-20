import React from 'react';
import VideoFrame from './videoFrames.js';
const DeleteVideo = (props) =>{
    return <button onClick = {props.handleDelete} Data = {props.Data}>DELETE</button>    
}
export default DeleteVideo;