import React, { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';

function Rating(props) {
const[rating,setRating]=useState(props.id.rating)
console.log(rating)
const handleIncrease=(id)=>{
    fetch(`http://localhost:3001/videos/${id}`,
    {
      method:"put",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({rating:rating+1})
      
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
window.location.reload()
    
}
const handleDicrease=(id)=>{
  fetch(`http://localhost:3001/videos/${id}`,
  {
    method:"put",
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({rating:rating-1})
    
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
window.location.reload()
}


const handleDelete= (id) => {
  fetch(`http://localhost:3001/videos/${id}`, {
      method: 'DELETE',
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
      })
  window.location.reload();
}
  return (
    <div>
      <button style={{margin:'10px'}} variant="success" onClick={() => handleDelete(props.id.id)}> <DeleteIcon/> </button>


        <button style={{margin:'10px'}} variant="success" onClick={() => handleIncrease(props.id.id)}> < ThumbUpIcon/> </button>
<span style={{color:"darkgoldenrod",margin:"10px"}}>
    {rating}
</span>
<button style={{margin:'10px'}}  variant="danger" onClick={() => handleDicrease(props.id.id)}> <ThumbDownAltIcon /> </button>

    </div>
  )
}

export default Rating