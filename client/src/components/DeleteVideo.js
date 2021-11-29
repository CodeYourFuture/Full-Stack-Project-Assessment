import React from 'react';

export default function DeleteVideo ({id, videos, setVideos}) {

    function handleDelete () {
        const filterVideos =  videos.filter(video => video.id !== id)
        setVideos(filterVideos)
    }
    return (
        <i className="fas fa-trash-alt" onClick={handleDelete}></i>
    )
}