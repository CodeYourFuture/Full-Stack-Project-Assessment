import React, { useEffect, useState } from "react"
import VideoCard from "../../components/VideoCard"
// import mockData from "../../exampleresponse.json"
import "./videoCards.css"

function VideoCards({ videos, onVideoUpdate }) {

    const handleLike = id => {
        fetch(`/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "put",
                body: JSON.stringify({ type: "like" })
            })
            .then(() => {
                onVideoUpdate()
            })
    }

    const handleDislike = id => {
        fetch(`/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "put",
                body: JSON.stringify({ type: "dislike" })
            })
            .then(() => {
                onVideoUpdate()
            })
    }

    const handleDelete = id => {
        fetch(`/${id}`,
            {
                method: "delete",
            })
            .then(() => {
                onVideoUpdate()
            })
    }


    return (
        <div className="video-cards">
            {videos.map((data) => {
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