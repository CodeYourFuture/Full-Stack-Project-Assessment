import { useState } from "react";
import AddVideo from "./AddVideo";

const VideoDisplay = (prop) => {



  const [allvideos, setAllVideos] = useState(prop.video);
  let a = [];
  let arrlength = prop.video.length;
  for (let i = 0; i < arrlength; i++) {
    a.push(i);
    // console.log(a)}
  }
    
  const [deletedvideos, setDeletedVideos] = useState([]);
  const [t, sett] = useState(-1);
  
  const inputVideo = (newvideo) => {
    
    
 
   
    
    setAllVideos(([...allvideos]).concat(newvideo));
    
  
  }

  
 
  

  const [deleteClicked, setDeleteClicked] = useState(false);
  let video = prop.video;
  const [videos, setVideo] = useState(video);
 // console.log(videos)
  const [voteCount, setVoteCount] = useState(0);

  const upVotes = () => {

    
    setVoteCount(voteCount + 1)
  }
  const downVotes = () => {
      
    setVoteCount(voteCount - 1)
  }
  const deleteVideo = (ind) => {
    
    setAllVideos([...allvideos].filter((ele, index) => ind!==index)) 
    
       
     }
  
  

  return (
    < div className='render'>
      
      <div>
        <AddVideo onClick={inputVideo} />
      </div>{" "}
      <div className='videos'>
      {[...allvideos].sort((a,b)=> b.rating-a.rating).map((videos, index) => {
        let id1 = videos.url.indexOf('=');
        let id= videos.url.substr(id1+1, videos.url.length);
        return (
          
          <ul
            style={{  }}
            className="Video-display"
          >
            {/* <li key= {prop.index }> id {prop.video.id} </li> */}
            <li>{videos.title} </li>
            <li>
              <i onClick={() => upVotes()} className="fas fa-thumbs-up"></i>
              <pre> </pre>
              {videos.rating + voteCount}
              <pre> </pre>
              <i onClick={() => downVotes()} className="fas fa-thumbs-down"></i>
            </li>

            <li>
              <iframe
                title={`${videos.title}`}
                width="460"
                height="415"
                src={`https://www.youtube.com/embed/${id}`}

                // frameborder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allowfullscreen
              ></iframe>
            </li>
            <li>{videos.date}</li>
            <li>{videos.time}</li>

            <li>
              <button
                onClick={() => {
                  deleteVideo(index);
                }}
              >
                {" "}
                delete{" "}
              </button>
            </li>
          </ul> 
        );
      })}</div>
    </div> 
  );
}

export default VideoDisplay;
