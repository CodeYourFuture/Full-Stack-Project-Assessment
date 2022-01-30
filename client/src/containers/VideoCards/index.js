import React from "react"
import VideoCard from "../../components/VideoCard"
import mockData from "../../exampleresponse.json"
import "./videoCards.css"

function VideoCards() {
    return (
        <div className="video-cards">
            {mockData.map((data) => {
                return <VideoCard
                    key={data.id}
                    title={data.title}
                    url={data.url.replace("watch?v=", "embed/")}
                    rating={data.rating}
                />
            })}
        </div>
    )
}

export default VideoCards;