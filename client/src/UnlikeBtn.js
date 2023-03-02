import React from "react";

const UnlikeBtn = ({handleMinus}) => {
    
   
    return (
        <div>
            <button className={"Vote-down"} onClick={handleMinus}>Vote Down</button>
        </div>
    );
};

export default UnlikeBtn