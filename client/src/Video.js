import React from 'react';

function Video({info}) {
  return (
    <div>
        <div>
        <h1>
        {info.title}
        </h1>
        <iframe src={`https://www.youtube.com/embed/${info.url}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
        >
        </iframe>
        <p>
        {info.rating}
        </p>
        <button>
            like
        </button>
        <button>
            dislike
        </button>
        <button>
            Delete
        </button>
        </div>
    </div>
  )
}
export default Video














