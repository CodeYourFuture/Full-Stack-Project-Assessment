import React from "react";
import LikeButtons from "./LikeButtons";

function Main({data, searchInput, updateRating, deleteVideo}){
    const dataManipulation = data
    .filter((e) => e.title && e.title.toLowerCase().includes(searchInput.toLowerCase()))
    .sort((a,b) => {
      return  a.rating > b.rating ? -1 : b.rating > a.rating ? 1 : 0
    })
    return(
       <main className="main">
            {dataManipulation.map((e) =>{
                const videoId = e.url.split('v=')[1]
                console.log(videoId)
                return(
                    <div className="map-div p-2 border shadow">
                    <div className="iframeAndDeletebutton-div">
                        <iframe width="340" height="195" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <button type="button" class="btn btn-warning col-3" onClick={(event)=> deleteVideo(event, e.id)}>Delete</button>
                    </div>
                    <div>
                        <p className="h3">{e.title}</p>
                        <LikeButtons votes={e.rating} updateRating={updateRating} videoId={e.id}/>
                    </div>
                    </div>
                )
            })}
       </main>
    );
}

export default Main;