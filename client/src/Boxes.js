import React from "react";
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
    {props.array.map((array) => (
      <div key={array.id}>
        <Box
          embed={array.url.slice(32)}
          title={array.title}
          id={array.id}
          rating={array.rating}
          setArray={props.setArray}
          array={props.array}
        />
      </div>
    ))}
  </div>
);}
export default Boxes;