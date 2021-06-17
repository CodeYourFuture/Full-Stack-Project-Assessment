import React from 'react';
import SingleVideoCard from './SingleVideoCard';

const VideoCards = ({ data, filteredData, setData, vote, setVote }) => {

    const handleDelete = (id) => {
        const updatedData = data.filter(video => video.id !== id);
        setData(updatedData);
    }

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-4 my-3">
            {filteredData.map((video, index) => (
                <SingleVideoCard key={index} video={video} handleDelete={handleDelete} vote={vote} setVote={setVote} />
            ))}
        </div>
    )
}

export default VideoCards
