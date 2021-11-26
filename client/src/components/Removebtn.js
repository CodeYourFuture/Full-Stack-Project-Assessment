import React, { useState } from "react";
import Videos from './Videos';

function Removebtn() {
    const [remove, setRemove] = useState(0);

    return (
        <div className='upvote-div'>
            <p>Want this to {remove}</p>
            <button onClick={() => setRemove()}> Remove</button>
            <Videos />
        </div>
    );
}

export default Removebtn;