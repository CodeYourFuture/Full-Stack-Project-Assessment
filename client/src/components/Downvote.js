import React, { useState } from "react";

function Downvote() {
    const [count, setCount] = useState(0);

    return (
        <div className= 'downvote-div'>
            <p>Thumbs Down {count}</p>
            <button onClick={() => setCount(count - 1)}> Vote</button>
        </div>
    );
}

export default Downvote;