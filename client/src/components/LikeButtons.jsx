import React from "react"
import { faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LikeButtons({votes, updateRating, videoId}){
 
    return (
        <div className="likesDiv p-2">
            {/* <button type="button" class="btn btn-success col-3" onClick={(e) => updateRating(e,videoId , 1)}>Like</button>
            <p className="text-warning bg-dark p-2 rounded"> <b>{votes} </b>Votes </p>
            <button type="button" class="btn btn-danger col-3" onClick={(e) => updateRating(e, videoId, -1 )}>Dislike</button> */}
            <button type="button" class="btn btn-success col-2" onClick={(e) => updateRating(e,videoId , 1)}>
                <FontAwesomeIcon icon={faThumbsUp}/></button>
            <p className="text-warning bg-dark p-2 rounded"> <b>{votes} </b>Votes </p>
            <button type="button" class="btn btn-danger col-2" onClick={(e) => updateRating(e, videoId, -1 )}>
                <FontAwesomeIcon icon={faThumbsDown}/></button> 
        </div>
    )
}
export default LikeButtons;
