import React from "react";

const Delete = (props) => {
    return ( 
        <div>
            <button onClick={props.delete} id={props.id}>Delete</button>
        </div>
     );
}
 
export default Delete;