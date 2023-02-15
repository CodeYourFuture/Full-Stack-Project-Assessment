import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
export default function Card({item,setVideolist,videolist }) {
  const[like,setLike]=useState(item.rating)
  
  

  const handleDelete=(id)=>{
fetch(`http://localhost:5000/videos/:${id}`,{method:'DELETE'})
.then(res=>res.json())
.then(data=>console.log(data))
const filtered=videolist.filter(i=>i.id!==item.id)
setVideolist(filtered);

  }

  return (
    <div>
       <div className="w3-card-4 w3-dark-grey" style={{width:"90%"}}>

<div className="w3-container w3-center" style={{border:'2px solid gray'}}>
  <h3>{item.title}</h3>
  <p>{item.uploadDate}</p>
  <div className="w3-section">
  <FontAwesomeIcon className='thumbup' icon={faThumbsUp} onClick={()=>setLike(like+1)}/>
  <FontAwesomeIcon icon={faThumbsDown} onClick={()=>setLike(like-1)}/>
    
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
  <FontAwesomeIcon icon={faTrash} onClick={handleDelete}/>
    
  </div>
</div>

</div>
    </div>
  )
}
