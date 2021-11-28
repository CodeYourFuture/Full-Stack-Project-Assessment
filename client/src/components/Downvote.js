import React, { useState } from "react";

function Downvote() {
    const [count, setCount] = useState(0);

    return (
        // <div className= 'downvote-div'>
        //     <p>Thumbs Down {count}</p>
        //     <button onClick={() => setCount(count - 1)}> Vote</button>
        // </div>
        
        <div className = 'downvote-div'>    
            <button onClick = {() => setCount(count-1)}> <i
            className="fa fa-thumbs-down"></i></button>
            <p>{count}</p>
        </div>
        
    );
}

export default Downvote;