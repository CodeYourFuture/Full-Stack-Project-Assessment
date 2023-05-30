    
  //   import React, { useEffect, useState } from "react"
  //   import axios from "axios"



  // function Video({info}) {
  //     return (
  //       <div>
  //           <div>
  //           <h6>
  //           {info.title}
  //           </h6>
  //           <iframe src={`https://www.youtube.com/embed/${info.url}`}
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowFullScreen
  //           title="Embedded youtube"
  //           >
  //           </iframe>
  //           <p>
  //           {info.rating}
  //           </p>
  //           <button>
  //               👍
  //           </button>
  //           <button>
  //              👎
  //           </button>
  //           <button>
  //               Delete
  //           </button>
  //           </div>
  //       </div>
  //     )
  //   }
  //   export default Video

  import React from "react";
  import Button from "react-bootstrap/Button";
  import axios from "axios";

  function Video({ info }) {
    const handleLike = () => {
      // Handle like button click
    };
  
    const handleDislike = () => {
      // Handle dislike button click
    };
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:5009/video/${id}`)
      alert ("video has been deleted")
      window.location.reload()

      // Handle delete button click
    };
  
    return (
    
        <div>
          <h6 className="title" >{info.title}</h6>

          <iframe
            src={`https://www.youtube.com/embed/${info.url}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          ></iframe>
          <p>{info.rating}</p>
          <div className="d-flex justify-content-evenly align-items-center">
            <div className="d-flex">
              <Button variant="primary" onClick={handleLike} className="mr-2">
                👍
              </Button>
              <Button variant="secondary" onClick={handleDislike} className="mr-2">
                👎
              </Button>
            </div>
            <Button variant="outline-danger" onClick={() => handleDelete(info.id)}>
              Delete
            </Button>
          </div>
        </div>
      
    );
  }
  

  
  export default Video;
  
  
  
  