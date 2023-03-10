import React, {useState} from "react";
import DeleteBtn from "./DeleteBtn";
import LikeBtn from "./LikeBtn";
import UnlikeBtn from "./UnlikeBtn";
import EmbedVid from "./EmbedVid";

const Videos = ({data}) => {

    const [Delete , setDelete]  = useState([data]);
    const handleDelete = (index) => {
        const newItems = [...Delete];
        newItems.splice(index, 1);
        setDelete(newItems);
    };

    return(
        <div>
            <ul>
                {data.map((object, index) => (<li key={object.id} title={object.title} >
                    <h2>{object.title}</h2>
                    <EmbedVid data={data} />
                    <DeleteBtn data={data}onClick={() => handleDelete(index)} />
                    <LikeBtn/>
                    <UnlikeBtn/>
                </li>))}                
            </ul>
        </div>
    );
};

export default Videos