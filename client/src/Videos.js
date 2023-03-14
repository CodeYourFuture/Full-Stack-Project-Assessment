import React from "react";
import DeleteBtn from "./DeleteBtn";
import LikeBtn from "./LikeBtn";
import UnlikeBtn from "./UnlikeBtn";


const Videos = ({data}) => {
    const embUrls = data.map((obj) => ({...obj, url: obj.url.replace("watch?v=", "embed/")}));

    return(
        <div>
            {embUrls.map((object) => (<span key={object.id} title={object.title} >
              <h2>{object.title}</h2>
              <iframe
                    width = "560"
                    height="315"
                    src={object.url}
                    title="YouTube video player"
                    frameBorder="0"
                    alt={`video ${data.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                />
                <DeleteBtn data={data} />
                <LikeBtn/>
                <UnlikeBtn/>
            </span>))}      
        </div>
    );
};

export default Videos