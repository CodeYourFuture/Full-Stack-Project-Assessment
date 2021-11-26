import React, { useState} from "react";


function Upvote(){
    const [count, setCount] = useState(0);

    return (
      <div className = 'upvote-div'>
          <p>Thumbs Up {count}</p>
        <button onClick = {() => setCount(count+1)}> Vote</button>
      </div>
    );
}

export default Upvote;