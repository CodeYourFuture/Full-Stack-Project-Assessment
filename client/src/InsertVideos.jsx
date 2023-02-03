import React from 'react'
import Data from './exampleresponse.json'



export default function InsertVideos() {
  return (
    <div className='all-videos'>
      {
        Data.map((video, key) => {
            return (
                <div className='video' key={key}>
                    <p>{video.title}</p>
                    <div>
                      <button></button>
                    </div>
                </div>
            )
        })
      }
    </div>
  )
}
