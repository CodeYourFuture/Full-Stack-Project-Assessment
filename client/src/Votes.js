import React, {useState} from 'react';
import Dislike from "./Dislike"
import Like from "./Like"

const Votes = () => {
    const [likes, setLikes] = useState(0)

	function liked(){
		setLikes(likes + 1)
	}

	function disliked(){
		setLikes(likes - 1)
	}
  return (
   	 <div className='votes'>
		<Like upVoteHandler={liked} />
		<h4 className='videorating'>
            Votes:{likes}
        </h4>
        <Dislike downVoteHandler={disliked}/>
	</div>
  )
}

export default Votes