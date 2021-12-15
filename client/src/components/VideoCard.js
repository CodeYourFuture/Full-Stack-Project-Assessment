import { useState } from "react";

const VideoCard = (prop) => {
  let videos = prop.videos;
  const upVotes = (id) => {
    
   setVoting((videos.rating += 1));
   
  };
  
  const [visible, setVisible] = useState(false);

  const deleteVideo = (id) => {
    console.log("hi")
    fetch(`https://shrouded-spire-27599.herokuapp.com/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then( )
      .catch((error) => error);
    setVisible(true);
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
  
    <ul
      key={prop.key}
      style={{ display: visible ? "none" : "flex" }}
      className="Video-display"
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
          ? date.toLocaleDateString('en-Gb')
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
            deleteVideo(videos.id);
            
          }}
        >
          {" "}
          delete{" "}
        </button>
      </li>
    </ul> 
  );
};
export default VideoCard;
