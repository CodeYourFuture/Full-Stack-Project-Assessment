import React from "react";

const LikeBtn= ({handleAdd}) => {
    
    return (
        <div>
            <button className={"Vote-up"} onClick={handleAdd}>Vote Up</button>
        </div>
    );
};

export default LikeBtn