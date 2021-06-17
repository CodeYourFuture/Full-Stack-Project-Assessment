import React,{useState} from 'react'
import "./Videos.css";
import thumbsUp from  "../../images/thumb-up.svg";
import thumbsDown from  "../../images/thumb-down.svg"; 

function Videos({video,deleteVideo}) {
 
	const [like, setLike] = useState(video.rating);
   

	const incrementRating = () => {
		setLike(like + 1);
	}

	const decrementRating = () => {
        setLike(like - 1);
    }
  

  const videoID = video.url.split('v=');

    return (
        <div  className="main-videos" >    
        
                 <div className="iframe-container" >
                     <p>{video.title}</p>
                     <div className="thumbes-container">
                     <img  onClick={() => incrementRating()}  src={thumbsUp} alt='thumbs up' className='thumbs'  />
                       <span className="vote">Vote:  {like}</span>
                     <img onClick={() => decrementRating()} src={thumbsDown} alt='thumbs down' className='thumbs' /> 
                     </div>
                       <iframe 
                         title="YouTube video player" 
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                         src={`https://www.youtube.com/embed/${videoID[1]}`}
                        >
                        </iframe> 
                        <button  className="delete" onClick={() => deleteVideo(video.id)}>Delete</button>                      
                 </div>
             
      
         
         </div>
    )
}

export default Videos