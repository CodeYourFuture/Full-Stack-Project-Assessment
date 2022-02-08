import React from "react";

import VoteCount from "./VoteCount";

function Videos (prop) {
    // const [list, setList] = useState(prop.videos);

    // const removeItem = (item) => {
        // setList(list.filter(video => video.title !== item.title));
    // }

    return (
        <div className="row">
            {
            prop.videos.map((video) => 
                <div className="col-md-6" key={video.id}>
                    <div className="card-body" >
                        <h5 className="card-title">{video.title}</h5>
                        <VoteCount />
                        <iframe width="560" height="315" src={video.url.replace("watch?v=", "embed/")} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <div> 
                            <button onClick={() => prop.delete(video)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div> )
            }
        </div>
    )
}
export default Videos;

/* 
// const [list, setList] = useState(prop.videos);

const removeItem = (item) => {
  
  // setList(list.filter(video => video.title !== item.title));
}
  return (
    <div>
        {prop.videos.map((video) => {
            return (
              <Videos key={video.id} title={video.title} url={video.url.replace("watch?v=", "embed/")} 
                rating={video.rating} videoId={video.id} item={video} delete={removeItem(video)}/>
              )
        })
        }
    </div>);
*/