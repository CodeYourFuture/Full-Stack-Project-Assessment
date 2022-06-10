import React , {useState} from "react";


const Video = () => {
    const [votes , setVotes ] = useState (0);
    
    const like = () => {
        setVotes(count => count + 1);
      };

      const dislike = () => {
        setVotes(count => count - 1);
      };
    return(
        <span>
            <h3>My Video</h3>    
            <button onClick={like}>Like</button>
            <h5>{votes}</h5>
            <button onClick={dislike}>Dislike</button>
        </span>
    )
};

export default Video ;