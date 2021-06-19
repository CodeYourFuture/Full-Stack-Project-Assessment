import React from 'react';
import SingleVideoCard from './SingleVideoCard';

const VideoCards = ({ data, setData, search }) => {

    const handleDelete = (id) => {
        const updatedData = data.filter(video => video.id !== id);
        setData(updatedData);
        console.log(updatedData)
    }

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-4 my-3">
            {data
            .filter(video => video.title.toUpperCase().includes(search.toUpperCase()))
            .map((video, index) => (
                <SingleVideoCard key={index} video={video} handleDelete={handleDelete} />
            ))}
        </div>
    )
}

export default VideoCards
