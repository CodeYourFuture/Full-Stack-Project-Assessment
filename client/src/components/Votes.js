import React, {useState} from 'react'


function Votes({vote}) {
    
    const [votes, setVotes] = useState(vote);
    console.log(votes)
   

    const increaseVote = ()=>setVotes(Number(votes) + 1);
    const decreaseVote = ()=>{if(votes>0) setVotes(votes -1)};
  
    return (
        <div className="d-flex flex-row  justify-content-center ">
            <h5 className="text-danger"><i onClick={increaseVote} className="bi bi-hand-thumbs-up-fill text-danger "/>{votes} votes</h5>
            <h5><i onClick={decreaseVote} className="bi bi-hand-thumbs-down-fill text-danger"/></h5>
           
          
        </div>
    )
}

export default Votes
