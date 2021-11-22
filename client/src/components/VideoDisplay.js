

import { useState } from "react";

const VideoDisplay = (prop) =>

{
    const [deleteClicked, setDeleteClicked] = useState(false);

    const deleteVideo=()=>{
        
        setDeleteClicked(true);
    }
  let id = prop.video.url.substr(-11, prop.video.url.length);


    return (
      <>
        <ul
          style={{ display: deleteClicked ? "none" : "flex" }}
          className="Video-display"
        >
          {/* <li key= {prop.index }> id {prop.video.id} </li> */}
          <li>{prop.video.title} </li>
          <li>
            <i class="fas fa-thumbs-up"></i>
            <pre>  </pre>
            {prop.video.rating}
            <pre>  </pre>
            <i class="fas fa-thumbs-down"></i>
          </li>

          <li>
            <iframe
              width="460"
              height="415"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </li>

          <li>
            <button
              onClick={() => {
                deleteVideo();
              }}
            >
              {" "}
              delete{" "}
            </button>
          </li>
        </ul>
      </>
    );


}
 

export default VideoDisplay;