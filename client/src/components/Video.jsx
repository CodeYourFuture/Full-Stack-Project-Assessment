import React , {useState} from "react";
import mydata from './../exampleresponse.json';

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
            <button onClick={dislike}>Dislike</button>
            <h5>{votes}</h5>
            {mydata.map( (movie)=>
             {const {title , id , url , rating } = movie ;
             return <div key={id}> {title}<iframe
              width="853"
              height="480"
              src={url.replace("watch?v=", "embed/")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            /></div>;
            })}
            <button>Delete Video</button>        
            
        </span>
    )
};

export default Video ;