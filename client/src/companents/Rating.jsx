import React, { useState } from 'react'

function Rating(props) {
const[rating,setRating]=useState(props.vid.rating)
console.log(rating)
const handleIncrease=()=>{
    setRating(rating+1);
    
}
const handleDicrease=()=>{
    setRating(rating-1);
}

  return (
    <div>
        <button style={{margin:'10px'}} variant="success" onClick={() => handleIncrease()}>+</button>
<span style={{color:"darkgoldenrod",margin:"10px"}}>
    {rating}
</span>
<button style={{margin:'10px'}}  variant="danger" onClick={() => handleDicrease()}>-</button>

    </div>
  )
}

export default Rating