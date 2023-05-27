import exampleresponse from "./exampleresponse.json"
const VideoCard =()=>{
  function upVoteClicked(props){
  console.log(<props className="props video"></props>,props.rating);
  }
  function downVoteClicked(){
  console.log("downvote");
  }
    return (
        <div>
        {exampleresponse.map(video=>
                    {return (<div>            
                <h2>{video.title}</h2>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture" allowfullscreen></iframe>
                 <h2>{video.rating}</h2>
                 <img src="https://www.svgrepo.com/show/334337/upvote.svg" alt="Up Vote" width="50" height="50"onClick={upVoteClicked(video)}></img>
                 <img src="https://www.svgrepo.com/show/333916/downvote.svg" alt="Down Vote" width="50" height="50"onClick={downVoteClicked}></img>
                 </div>)
          })}
        </div>)
}
export default VideoCard;
