import React from 'react'

const Dislike = ({downVoteHandler}) => {
  return (
    <button onClick={downVoteHandler} className='down'>
        Downvote
    </button>
  )
}

export default Dislike