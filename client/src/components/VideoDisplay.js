import { useState } from "react";
import AddVideo from "./AddVideo";

const VideoDisplay = (prop) => {



  const [allvideos, setAllVideos] = useState(prop.video);
  const [newvideo, setNewVideo] = useState([{
      id: 283634,
      title: "Learn Unity - Beginner's Game Development Course",
      url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
      rating: 211,
    }]);
  //console.log(allvideos);
  
  
  
  
   
  // const deleteDisplay = () => {
   
    
  //   setAddDisplay(false);
  // };
  
  const inputVideo = () => {
    
    //set();
    //setAddDisplay(true);
   // console.log(newvideo);
 
   
    
    setAllVideos(([...allvideos]).concat(newvideo));
    
  
  }

  
 
  const [i,seti] = useState(-1);

  const [deleteClicked, setDeleteClicked] = useState(false);
  let video = prop.video;
  const [videos, setVideo] = useState(video);
  console.log(videos)
  const [voteCount, setVoteCount] = useState(0);

  const upVotes = () => {

    
    setVoteCount(voteCount + 1)
  }
  const downVotes = () => {
      
    setVoteCount(voteCount - 1)
  }
  const deleteVideo = (index) => {
    seti(index);
    
    ([...allvideos].splice(index, 1));
    setAllVideos(allvideos)
  };
  

  return (
    <>
      
      <div>
        <AddVideo onClick={inputVideo} />
      </div>{" "}
      
      {[...allvideos].map((videos, index) => {
        let id = videos.url.substr(-11, videos.url.length);
        return (
          <ul
            style={{ display: index === i ? "none" : "flex" }}
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
      })}
    </>
  );
}

export default VideoDisplay;
