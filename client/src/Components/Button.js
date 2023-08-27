import React, {useState} from "react";

function Button({video}) {

const [upCount, setUpCount] = useState(0);
 const [downCount, setDownCount] = useState(0);


    function like() {
      // console.log(props.video);
       video.rating += 1;
       setUpCount(video.rating + 1)
    }


    function dislike() {
    //  console.log(props.video);
     video.rating -= 1;
     setDownCount(video.rating -1);  
    }


  return (
    <div>
      <button onClick={like}  className="like">Like 👍🏼 : {upCount}</button>
      <button onClick={dislike}className="dislike">Dislike 👎🏻 : {downCount}</button>
    </div>
  );
}


export default Button;
