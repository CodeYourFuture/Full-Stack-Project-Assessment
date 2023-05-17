    import React, { useEffect, useState } from "react"
    import axios from "axios"


    function Video() {
      const[info, setInfo] = useState ([])
       useEffect (()=> {
      //   axios.get("http://localhost:5000/video",{
      //     headers:{
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Methods': 'GET',
      //       'Access-Control-Allow-Headers': 'Content-Type',
      //     }
      //   })
      // .then(res => {
      //   setInfo(res.data)
        
      // })
      fetch("http://localhost:5009/video")
      .then((response) => response.json())
      .then((data) => {
       console.log(data)
      })

      },[info])
      

      return (
        <div>
            <div>
            <h1>
            {info.title}
            </h1>
            <iframe src={`https://www.youtube.com/embed/${info.url}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            >
            </iframe>
            <p>
            {info.rating}
            </p>
            <button>
                👍
            </button>
            <button>
               👎
            </button>
            <button>
                Delete
            </button>
            </div>
        </div>
      )
    }
    export default Video

























