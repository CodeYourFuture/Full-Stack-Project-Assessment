import React from "react";
import DeleteBtn from "./DeleteBtn";
import LikeBtn from "./LikeBtn";
import UnlikeBtn from "./UnlikeBtn";
import axios from 'axios';



const Videos = ({embUrls}) => {

    const handleDelete = (id) => {
        axios.delete(`/videos/delete/${id}`)
          .then((response) => {
            console.log(response.data);
            // do something to update the UI (e.g. remove the video from a list)
          })
          .catch((error) => {
            console.error(error);
            // handle the error (e.g. display an error message)
          });
      };
      

    return(
        <div>
            {embUrls.map((object) => (<span key={object.id} title={object.title} >
              <h3>{object.title}</h3>
              <iframe
                    width = "560"
                    height="315"
                    src={object.url}
                    title={object.title}
                    frameBorder="0"
                    alt={`video ${object.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                />
                <DeleteBtn onClick={() => handleDelete(embUrls.id)} />
                <LikeBtn/>
                <UnlikeBtn/>
            </span>))}      
        </div>
    );
};

export default Videos