import React from "react"
import VideoCard from "../../components/VideoCard"
import mockData from "../../exampleresponse.json"
import "./videoCards.css"

function VideoCards() {
    const handleLike = id => { console.log(id) }
    const handleDislike = id => { console.log(id) }
    const handleDelete = id => { console.log(id) }
    return (
        <div className="video-cards">
            {mockData.map((data) => {
                return <VideoCard
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    url={data.url.replace("watch?v=", "embed/")}
                    rating={data.rating}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onDelete={handleDelete}
                />
            })}
        </div>
    )
}

export default VideoCards;