import React from "react";
import DeleteBtn from "./DeleteBtn";
import LikeBtn from "./LikeBtn";
import UnlikeBtn from "./UnlikeBtn";


const Videos = ({embUrls}) => {
    // const embUrls = data.map((obj) => ({...obj, url: obj.url.replace("watch?v=", "embed/")}));

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
                <DeleteBtn embUrls={embUrls} />
                <LikeBtn/>
                <UnlikeBtn/>
            </span>))}      
        </div>
    );
};

export default Videos