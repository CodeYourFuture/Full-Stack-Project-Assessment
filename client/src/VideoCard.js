import {  useState} from "react";







function VideoCard(props) {
  const videoUrlId = props.url.slice(props.url.indexOf("v=") + 2);
  


  let [vote, setVote] = useState(0);

  function increaseVote() {
    // console.log("clicked");
    setVote(vote + 1);
  }

  function decreaseVote() {
    //console.log("clicked");
    setVote(vote - 1);
  }

  
  
  //console.log(props.videos)
  return (
    <div>
      <div className="vedio-card">
         
                 <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoUrlId}`}
          title={props.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
          {" "}
        </iframe>
        <p>{props.title} </p>
        <div className="iconsDiv">
          <p> votes {vote} </p>
          <button onClick={increaseVote} class="fa fa-thumbs-up"></button>
          <i onClick={() => props.delete(props.id)} class="fa fa-trash-alt"></i>
          <button onClick={decreaseVote} class="fa fa-thumbs-down"></button>
        </div>
      </div>
    </div>
  );
}
 export default VideoCard;
//style={{ margin: "15px" }}