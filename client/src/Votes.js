import React, {useState} from "react";
// import { GoThumbsup } from "react-icons/go";
// import{ GoThumbsdown } from "react-icons/go"
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import up from "../src/img/up.png";
import down from "../src/img/down.png";


function Votes(props) {
    const [vote, setVote] = useState(0);

    function incrementVoteCount() {
       return setVote( vote +1);
    }
    
    function decrementVoteCount() {
        return setVote( vote -1);
     }


    return (
       <div className="images">
           {/* <button href="#" onClick={incrementVoteCount}>Vote</button> 
           <h1>{vote}</h1> */}
           <img src={up} width = "50px" onClick={incrementVoteCount} />
           {vote}
           <img src={down} width = "50px" onClick={decrementVoteCount}/>
       </div> 

    )
}

export default Votes;