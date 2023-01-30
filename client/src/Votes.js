
import React, { useState } from "react";

 function Votes(){
    const [Like, setLike] = useState(0);

    const handleLike = () => {
        setLike(Votes + 1);
    };
 const [Dislike, setDislike] = useState(0);

    const handleDislike = () => {
        setDislike(Votes + 1);        
    };


    return(
        <div className="thumbs">
            
            <p>Votes: {Like}</p>
            

            <i className="fa fa-thumbs-up" onClick={handleLike}></i>
            {/*Dislike Thumb*/}
           
             <p>Votes: {Dislike}</p>
<i className="fa fa thumbs-down" onClick={handleDislike}></i>
        </div> 
    );
    }


export default Votes;