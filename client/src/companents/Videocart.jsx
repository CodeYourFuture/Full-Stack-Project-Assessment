import React from 'react'
import Deletebutton from './Deletebutton';
import Rating from './Rating';

function Videocart(props) {
    let src = "https://www.youtube.com/embed/" + props.data.url.split("=")[1];
  
  return (
    <div>
        <div className="container">

<div className="card mb-4 shadow-sm" style={{background:"black",border:"#D43C31 solid",margin:'2px',padding:'2px'}}>
 <div>
     <h6 style={{color:"#D43C31"}}>{props.data.title}</h6>
     <span>
<Rating vid={props.data}/>
       
     </span>
 </div>

    <iframe
        style={{"height":"500px",'weihgt':"200px"}} className="card-img-top" alt={props.data.Title}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
    />
</div>
</div>
    </div>
  )
}

export default Videocart