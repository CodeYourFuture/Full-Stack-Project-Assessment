import { useState } from "react"
const Counter = () => {
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

    return (
        <div>
            <div className="rate">
                <img alt="heart" className="image-heart" src="https://www.svgrepo.com/show/439915/heart-fill.svg"></img>
                <span>{rating}</span>
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