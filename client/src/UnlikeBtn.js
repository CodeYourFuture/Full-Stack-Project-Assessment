import React, { useState } from "react";

const UnlikeBtn = () => {
    const [minus, setMinus] = useState(0);
    
    const handleMinus = () => setMinus(minus - 1);
   
    return (
        <div>
            <p>This video has {minus} dislikes</p>
            <button onClick={handleMinus}>Vote Down</button>
        </div>
    );
};

export default UnlikeBtn