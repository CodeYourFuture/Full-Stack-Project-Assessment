import React from "react";
import VoteCount from "./VoteCount";

function Videos (prop) {

    return (
        <div className="row">
            { 
            (prop.videos) ? (
                prop.videos.map((video) => 
                    <div className="col-md-6" key={video.id}>
                        <div className="card-body" >
                            <h5 className="card-title">{video.title}</h5>
                            <VoteCount />
                            <iframe src={video.url.replace("watch?v=", "embed/")} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div> 
                                <button onClick={() => prop.delete(video)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div> )
                
            ) : ( null )
            }
        </div>
    )
}
export default Videos;
