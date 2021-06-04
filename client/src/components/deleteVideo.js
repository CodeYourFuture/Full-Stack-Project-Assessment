import React from 'react';
const DeleteVideo = (props) =>{
    return <button onClick = {props.handleDelete} className="btn btn-danger" >DELETE</button>    
}
export default DeleteVideo;