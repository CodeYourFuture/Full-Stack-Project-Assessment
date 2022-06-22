import React, { useState } from "react";
// import videosData from "./exampleresponse.json"

function DeleteButton({data,removeVideo}) {
    
    return (
        <div>
            <button
              className="btn btn-default"
        
              onClick={removeVideo}>DELETE</button>

       </div>
    )
}


export default DeleteButton;