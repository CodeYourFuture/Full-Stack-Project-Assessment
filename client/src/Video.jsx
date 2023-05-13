import React from 'react'

function Video({info}) {
  return (
    <div>
        <div>
            <button>
                like

            </button>
        <h1>
        {info.title}
        </h1>
        <button>
            dislike

        </button>
        <iframe src={`https://www.youtube.com/embed/${info.url}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        
        >

        </iframe>
        <p>
        {info.rating}
        </p>
       <button>
        Delete
       </button>

        </div>
       
    </div>
  )
}

export default Video