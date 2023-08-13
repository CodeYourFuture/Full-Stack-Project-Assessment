
import { useState } from "react";

function VideoCards({video, handleListOfVideos}) {

  const [currentRate, setCurrentRate] = useState(video.rating)
   
  const handleUp = () => {
    console.log(currentRate);
    if (video.id)
      {setCurrentRate(currentRate + 1)}
  }

  const handleDown = () => {
    if(video.id && currentRate>0)
    {setCurrentRate(currentRate - 1)}
  }
  const handleDelete = () => {
   if(video.id){
    handleListOfVideos(video.id)
   }
  }

  return (
    <>
      <div className="card">
        <iframe title="myFrame"
          src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
          <p className="card-text"> Rating: {currentRate}</p>
        </div>
        <div className="button-group">
        <button type="button" class="btn btn-success" onClick={handleUp}>Up</button>
        <button type="button" class="btn btn-warning" onClick={handleDown}>Down</button>
        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
      </div>

    </>
  );
}

export default VideoCards;
