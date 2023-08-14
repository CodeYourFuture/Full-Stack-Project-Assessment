import "../Style/Videos.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
// console.log(data);
const Videos = ({ videos, onVideoDelete, onVideoLike, onVideoDisLike}) => {
  const[]=useState(videos)
  return (
    <div className="videos">
      {videos.map((vid, index) => {
        const videoId = vid.url.substring(vid.url.indexOf("?v=") + 3);
        console.log(videoId);
        return (
          <section key={index} className="videos-cont">
            <iframe
              width="560"
              height="315"
              src={"https://www.youtube.com/embed/" + videoId}
              title={vid.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <h3>{vid.title}</h3>
            <div className="like-dislik-delete-span">
              <span>
                <StarBorderIcon />
                {vid.rating}
              </span>
              <div className="like-dislik-delete">
                <button className="like-button" onClick={()=>onVideoLike(index)}>
                  <ThumbUpOutlinedIcon />
                </button>
                <button className="dislike-button" onClick={() =>onVideoDisLike(index)}>
                  <ThumbDownOutlinedIcon />
                </button>
                <button className="delete" onClick={() => onVideoDelete(index)}>
                  <DeleteOutlineIcon />
                </button>
              </div>
            </div>

            <div></div>
          </section>
        );
      })}
    </div>
  );
};

export default Videos;
