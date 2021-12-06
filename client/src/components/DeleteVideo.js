import React from 'react';

export default function DeleteVideo ({id, videos, setVideos, fetchData}) {

    function handleDelete () {
        // const filterVideos =  videos.filter(video => video.id !== id)
        // setVideos(filterVideos)
        fetch(`http://localhost:5000/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if(res.status === 200){
                fetchData()
            }
        });
    }
    return (
        <i className="fas fa-trash-alt" onClick={handleDelete}></i>
    )
}