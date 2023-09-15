import { useState } from "react"
const Counter = ({ allMyVideos, setAllMyVideos, videoId, videoRating }) => {
    const [rating, setRating] = useState(0)


    const handleCounterDown = () => {
        if (rating <= 0) {
            setRating(0)
        } else {
            setRating(rating - 1)
            handleRatingChange(rating)
            getAllNewVideos()
        }
    }
    const handleCounterUp = () => {
        setRating(rating + 1)
        handleRatingChange(rating)
        getAllNewVideos()
    }



    const handleRatingChange = async (newRating) => {
        // PUT request to update the rating in the database
        try {
            const response = await fetch(`https://youtube-video-server.onrender.com/videos/${videoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rating: newRating }),
            });

            if (!response.ok) {
                console.error("Failed to update rating");
            }
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    const getAllNewVideos = () => {
        fetch("https://youtube-video-server.onrender.com/videos")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setAllMyVideos(data)
            })
    }

    //
    return (
        <div>
            <div className="rate">
                <img alt="heart" className="image-heart" src="https://www.svgrepo.com/show/439915/heart-fill.svg"></img>
                <span>{videoRating}</span>
            </div>
            <button className="up" onClick={handleCounterUp}>
                <img alt="tumb-up_picture" className="tumb-up" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg"></img>
            </button>
            <button className="down" onClick={handleCounterDown}>
                <img alt="tumb-down_picture" className="tumb-down" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg"></img>
            </button>
        </div>
    )
}
export default Counter