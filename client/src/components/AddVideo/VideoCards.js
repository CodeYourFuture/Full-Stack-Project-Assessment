import React from "react";
import SingleVideoCard from "./components/AddVideo/SingleVideoCard";

const VideoCards = ({ data, setData, search }) => {

    const handleDelete = async (id) => {
        try {
             await fetch(`http://localhost:3000/${id}`, {
                method: "DELETE"
            });

            const updatedData = data.filter(video => video.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-4 my-3">
            {data
                .filter(video => video.title.toUpperCase().includes(search.toUpperCase()))
                .map((video) => (
                    <SingleVideoCard key={video.id} video={video} handleDelete={handleDelete} />
                ))}
        </div>
    )
}

export default VideoCards;