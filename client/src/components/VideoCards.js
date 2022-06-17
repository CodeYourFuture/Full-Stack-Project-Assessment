import React,{useState} from "react";
import { Link } from "react-router-dom";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import { BsHandThumbsUpFill, BsHandThumbsDownFill} from 'react-icons/bs';



import '../styles/videoCards.scss';


const VideoCards = ({videoDates}) => {
  const [isOpen, setOpen] = useState(false);
  const [clickedVideoId, setClickedVideoId] = useState(null);
  const handleAddVideId=(id)=>setClickedVideoId(id);
  
  const openModal = () =>{
    setOpen(true)
  }

   return (
       <div className="card-container">
           {videoDates?videoDates.map(
                ({title,video_id,img_url,genres}, index) => {
                  return (
                      <div className="country-card">
                        <img
                          className="card-img-top card-img"
                          src={img_url}
                          alt="Card image cap"
                          width={'250px'}
                        />
                         <ModalVideo
                          channel="youtube"
                          isOpen={isOpen}
                          videoId={video_id}
                          onClose={() => setOpen(false)}
                        />
                        <button o onClick={() => {
                          openModal();
                          handleAddVideId({video_id});
                        }}>Open</button>
                        <div className="card-body">
                          <h3 className="card-title">{title}</h3>
                          <div className="card-info">
                            <p>
                              <span>{genres[0]}</span>
                            </p>
                            <BsHandThumbsUpFill/>
                            <p>
                              number of votes
                            </p>
                            <BsHandThumbsDownFill/>
                          </div>
                          <button className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                  );
                }
              )
            : "Loading..."}
       </div>
   );
 };
 
 export default VideoCards;
 