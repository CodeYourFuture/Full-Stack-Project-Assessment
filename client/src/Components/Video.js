import React, {useState} from "react";
import "./Video.css";
import Data from "./exampleresponse.json"
import Card from "./Card";


function Video() {
//     // react Hook For State Handler
//     const [data , setData]=useState(null)

// // Fetch Function   
// fetch("./exampleresponse.json").then(
//     function(res){
//     return res.json()
//   }).then(function(data){
//   // store Data in State Data Variable
//     setData(data)
//   }).catch(
//     function(err){
//       console.log(err, ' error')
//     }
//   )

    return(

<div className="video"> <h3>We are waiting for video here</h3>
    {Data.map((item)=>(
        <Card
        key={item.id}
        id={item.id}
        title={item.title}
        url={item.url}
        rating={item.rating} />
    ))}
</div>
    );
}

export default Video;
