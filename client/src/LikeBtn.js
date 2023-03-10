import React, { useState } from "react";

const LikeBtn= () => {
    const [add, setAdd] = useState(0);
    
    const handleAdd = () => setAdd(add + 1);
       
    return (
        <div>
            <p>This video has {add} likes</p>
            <button onClick={handleAdd} >Vote Up</button>
        </div>
    );
};

export default LikeBtn;


