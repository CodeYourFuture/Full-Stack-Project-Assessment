import { useState } from "react"
const Counter = ({ setAllMyVideos, videoId, videoRating }) => {
    const [rating, setRating] = useState(videoRating)
    let newRating
    const handleCounterDown = () => {
        if (rating <= 0) {
            newRating = 0
            setRating(newRating)
            handleRatingChange(newRating)
            getAllNewVideos()
        } else {
            newRating = rating - 1
            setRating(newRating)
            handleRatingChange(newRating)
            getAllNewVideos()
        }
    }
    const handleCounterUp = () => {
        newRating = rating + 1
        setRating(newRating)
        handleRatingChange(newRating)
        getAllNewVideos()
    }



    const handleRatingChange = async (newRating) => {
        // PUT request to update the rating in the database
        try {
            await fetch(`http://ec2-13-41-184-74.eu-west-2.compute.amazonaws.com/videos/${videoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rating: newRating }),
            });

        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    const getAllNewVideos = () => {
        fetch("http://ec2-13-41-184-74.eu-west-2.compute.amazonaws.com/videos")
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