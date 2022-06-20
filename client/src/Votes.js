import React, {useState} from "react";
// import { GoThumbsup } from "react-icons/go";
// import{ GoThumbsdown } from "react-icons/go"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';



function Votes(props) {
    const [vote, setVote] = useState(props.rating);

    function incrementVoteCount() {
       return setVote((currentVote) => currentVote +1);
    }
    
    function decrementVoteCount() {
        return setVote((currentVote) => currentVote -1);
     }


    return (
       <div>
           {/* <button href="#" onClick={incrementVoteCount}>Vote</button> 
           <h1>{vote}</h1> */}
           <ThumbUpOffAltIcon size="20px" onClick={incrementVoteCount} />
           <ThumbDownOffAltIcon size="20px" onClick={decrementVoteCount}/>
       </div> 

    )
}

export default Votes;