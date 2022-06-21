import React from 'react';
import './addVideo.css'

export default function AddVideo({addVideo, handleNewVidTitle, handleNewVidUrl}) {
  return (
    <form >
        <input type='text' placeholder='Add your title here' name="title" onChange={handleNewVidTitle}/>
        <input placeholder='Add url of you favourite video' name='url' onChange={handleNewVidUrl}/>
        <button onClick={addVideo}>Submit</button>
        
        
    </form>
  )
}
