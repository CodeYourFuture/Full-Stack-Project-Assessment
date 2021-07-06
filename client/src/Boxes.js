import React, {useState} from "react";
import Box from "./Box";

// var data = require('./exampleresponse.json'); // forward slashes will depend on the file location

const Boxes = (props) => {

    //not working
// let sampleData = [];
// fetch('./exampleresponse.json',{
//     headers:
//     {'Content-Type': 'application/json',
//     'Accept': 'application/json' }
// })
// .then(response=>response.json())
// .then(dat=>(sampleData=dat))

// console.log("sample data length",sampleData)

return (
  <div>
    {props.data.map((data) => (
      <div>
        <Box
          embed={data.url.slice(32)}
          title={data.title}
          id={data.id}
          rating={data.rating}
        />
           </div>
    ))}
    
  </div>
);}
export default Boxes;