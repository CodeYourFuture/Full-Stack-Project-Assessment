import React, { useState } from 'react'


export default function Card({item,setVideolist,videolist }) {
  const[like,setLike]=useState(item.rating)
  
  

  const handleDelete=()=>{

const filtered=videolist.filter(i=>i.id!==item.id)
setVideolist(filtered);
  }

  return (
    <div>
       <div className="w3-card-4 w3-dark-grey" style={{width:"50%"}}>

<div className="w3-container w3-center">
  <h3>{item.title}</h3>
  <div className="w3-section">
    <button className="w3-button w3-green" onClick={()=>setLike(like+1)}>Like</button>
    <button className="w3-button w3-red" onClick={()=>setLike(like-1)}>Dislike
    </button>
  </div>
  
  <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    height="200"
    style={{border: '0px',width: '100%'}}
    //changing the enbeded format the follow the url
    src={`https://www.youtube.com/embed/${item.url.split('=')[1]}`}>
</iframe>
  <h5>{like}</h5>

  <div className="w3-section">
    <button className="w3-button w3-green" onClick={handleDelete}>Delete</button>
    
  </div>
</div>

</div>
    </div>
  )
}
