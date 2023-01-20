import {useState} from 'react';
import Videos from "./exampleresponse.json";
import ReactPlayer from "react-player"

function Cards() {
  const [videos, setVideos] = useState(Videos);
  const removeElement = (i) => {
    let newVideos = [...videos];
    newVideos.splice(i,1);
    setVideos(newVideos)
  
  }
    return (
      <div className="Cards">
        {videos.map((video, index) => (
          <div index={index} key={video.id} title={video.title}  url={video.url} id={video.id}className="card">
           <div className='video'>
              <ReactPlayer className="video" width={400} height={300}  url={video.url}/>
            </div>  
            <div className="card-body">
              <h4>{video.title}</h4>
              <p>Votes</p>
              <div className="votes">
                <button className='up'>Upvote</button>
                {/* <p>Votes</p> */}
              <h4 className='videorating'>{video.rating}</h4>
              <button className='down'>Downvote</button>
              </div>
              <a
                href={video.url}
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Watch Now
              </a>
              <button className="delete" onClick={() => removeElement(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Cards;