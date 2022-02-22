import React, { useState } from "react";


const AscDescBtn = (props) => {
    const [asc, setAsc] = useState(true);
   
   
   function handleOrder(e){
    e.preventDefault();
    setAsc(!asc); 
    if(asc) {
     props.videoData.sort((a,b) => a.rating - b.rating, 0)
    } else {
      props.videoData.sort((a, b) => b.rating - a.rating, 0);
    }
      
   }
   
    return (
      <div>
        <button type="button" className="AscDescBtn" onClick={handleOrder}>
          Asc/Desc
        </button>
       
      </div>
    );
}

export default AscDescBtn;