import React from "react";
import { useState } from "react";
import "./compStyle.css"



export const Video = (props) => {


const [countClicking, setCountClicikng] = useState(0)

const like = () => {
    setCountClicikng(countClicking+1)
}
const dislike = () => {
    if(countClicking>0){
        setCountClicikng(countClicking-1)
    }
    
}

let listThem = props.url.substring(32,props.url.length)

return (
    <div className="d-flex flex-column">
     <iframe className="m-2" width="355" height="200" src={`https://www.youtube.com/embed/${listThem}`} title={props.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
     <div className="d-flex">
     <i onClick={like} className="fa-sharp fa-regular fa-thumbs-up cursoring"></i>
     <i onClick={dislike} className="fa-sharp fa-regular fa-thumbs-down ml-3 cursoring"></i>
     <p className="ml-3">{countClicking}</p>
     </div>
    </div>
)
}