import { useState } from 'react'

const VideoCardButtons = ( { rating, removeVideo, id } ) => {
    let [vote, setVote] = useState(rating)

    const upVote = () => {
        setVote(vote++)
    }

    const downVote = () => {
        setVote(vote--)
    }

  return (
    <div className='video-buttons'>
       <span>{vote}</span>
            <i className="bi bi-hand-thumbs-up" onClick={upVote}></i>
            <i className="bi bi-hand-thumbs-down" onClick={downVote}></i>
            <button onClick={()=>removeVideo(id)}>remove video</button>
    </div>
  )
}

export default VideoCardButtons
