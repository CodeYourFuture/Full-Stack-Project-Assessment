

import { useState } from "react";

const VideoCard = (prop) => {
  let videos = prop.videos;
  const upVotes = (id) => {
    
   setVoting((videos.rating += 1));
   
  };
  
 
  
 

    
    


  const downVotes = (id) => {
   
    setVoting((videos.rating -= 1));
    
  };
   
  let [voting, setVoting] = useState(0);
  let date = new Date(Date.parse(prop.videos.daytime));
  console.log(date);
  let id = prop.videos.url.substr(
    prop.videos.url.length - 11,
    prop.videos.url.length
  );
  return (
    <ul id={prop.videos.id}
      key={prop.key}
      display='flex'
       className='Video-display'
    >
      <li>{prop.videos.title} </li>
      <li>
        <button
          className="add"
          aria-label="upvote"
          onClick={() => upVotes(prop.videos.id)}
        >
          <i className="fas fa-thumbs-up"></i>
        </button>
        <pre> </pre>
        <p id={prop.videos.id}>{prop.videos.rating}</p>

        <pre> </pre>
        <button
          className="add"
          aria-label="downvote"
          onClick={() => downVotes(prop.videos.id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
      </li>
      <li>
        <iframe
          title={`${prop.videos.title}`}
          width="460"
          height="415"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </li>
      <li>
        On{" "}
        {prop.videos.hasOwnProperty("daytime")
          ? date.toLocaleDateString("en-Gb")
          : new Date().toLocaleDateString("en-Gb")}
      </li>
      <li>
        At{" "}
        {prop.videos.hasOwnProperty("daytime")
          ? date.toLocaleTimeString({ timeZone: "UTC" })
          : new Date().toLocaleTimeString({ timeZone: "UTC" })}
      </li>
      <li>
        <button
          onClick={() => {
            prop.handledelete(prop.videos.id);
          }}
        >
          {" "}
          delete{" "}
        </button>
      </li>
      {}
    </ul>
  );
  
};
export default VideoCard;
