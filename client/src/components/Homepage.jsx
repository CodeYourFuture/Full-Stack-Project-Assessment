import React from 'react';
import exampleresponse from './server/exampleresponse';

const Homepage = () => {

let videoArray = exampleresponse;    
    // 2- add heading of the video
    //3- create thums up & down (useState for number) ... create a counter , useState.
    // -  
    return (
        <div>
            {videoArray.map( () => {

            })}
        </div>
    )

};
export default Homepage ;