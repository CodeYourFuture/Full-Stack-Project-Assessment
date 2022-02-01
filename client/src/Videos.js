import React, { useState } from "react";

import VoteCount from "./VoteCount";

function Videos (prop) {
    const [list, setList] = useState(prop.videos);
    const remove = (item) => {
        const newList = list.filter(video => video.title !== item.title);
        setList(newList);
    }
    return (
        <div className="row">
            {
           list.map((video, ind) => 
                <div className="col-md-6">
                    <div className="card-body" key={ind}>
                    <h5 className="card-title">{video.title}</h5>
                    <VoteCount />
                    <iframe title={video.title} 
                    src={`https://www.youtube.com/embed/${video.url.slice(32)}`} 
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe>
                    <div> <button onClick={()=>{remove(video)}} className="btn btn-danger">Delete</button></div>
                    </div>
                </div> )
            }

        </div>
    )
}
export default Videos;