import {useState} from 'react';
import Videos from "./exampleresponse.json";

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
            <div className="card-body">
              <h4>{video.title}</h4>
              <h4>{video.rating}</h4>
              {/* <h5>{video.id}</h5> */}
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