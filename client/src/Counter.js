import { useState } from "react"
const Counter = ({ allMyVideos, setAllMyVideos, videoId }) => {
    const [counterDown, setCounterDown] = useState(0)
    const [counterUp, setCounterUp] = useState(0)
    const [rating, setRating] = useState(0)

    const handleCounterDown = () => {
        setCounterDown(counterDown + 1)
        if (rating <= 0) {
            setRating(0)
        } else {
            setRating(rating - 1)
        }
    }
    const handleCounterUp = () => {
        setCounterUp(counterUp + 1)
        if (counterUp >= counterDown) {
            setRating(rating + 1)
        }

    }

    const handleRatingChange = () => {
        const editedVideo = {
            rating
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedVideo)
        };
        fetch(`https://youtube-video-server.onrender.com/rating/${videoId}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                return response.json();
            })
            .then(updatedVideo => {
                console.log({ updatedVideo })
                setAllMyVideos(updatedVideo);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            })
    }


    return (
        <div>
            <div className="rate">
                <img alt="heart" className="image-heart" src="https://www.svgrepo.com/show/439915/heart-fill.svg"></img>
                <span onChange={handleRatingChange}>{rating}</span>
            </div>
            <button className="up" onClick={handleCounterUp}>
                <img alt="tumb-up_picture" className="tumb-up" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg">
                </img>{counterUp}
            </button>
            <button className="down" onClick={handleCounterDown}>
                <img alt="tumb-down_picture" className="tumb-down" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg"></img>
                <span>{counterDown}</span>
            </button>
        </div>
    )
}
export default Counter