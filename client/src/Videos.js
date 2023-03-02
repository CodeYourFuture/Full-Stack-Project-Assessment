import React, {useState} from "react";
import DeleteBtn from "./DeleteBtn";
import LikeBtn from "./LikeBtn";
import UnlikeBtn from "./UnlikeBtn";
import YouTube from 'react-youtube';


const Videos = ({data, count}) => {
    console.log(data);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };

    const [clicked , setClicked]  = useState(0);

    const handleAdd = () => setClicked(clicked) ? count+1 : count;
    const handleMinus = () => count >= 0 ? count - 1 : 0;
    const handleDelete = (item) => item.splice({item});

    return(
        <div>
            <ul>
                {data.map((object) => (<li key={object.id} title={object.title} src={object.url}>
                    <YouTube videoId="data.id" title={data.title} alt={data.title} opts={opts}/>
                    <h2>{object.title}</h2>
                    <span className="likes-counter" >This video has {count} Likes</span>
                    <LikeBtn handleAdd={handleAdd} />
                    <UnlikeBtn handleMinus={handleMinus} />
                    <DeleteBtn handleDelete={handleDelete} />
                </li>))}                
            </ul>
        </div>
    );
};

export default Videos