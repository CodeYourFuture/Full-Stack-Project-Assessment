import React from "react"

const Like = ({ upVoteHandler }) => {
	return (
		<button onClick={upVoteHandler}  className='up'>
			Upvote
		</button>
	)
}

export default Like
