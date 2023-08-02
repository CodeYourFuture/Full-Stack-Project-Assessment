import { useState } from "react"
const Counter = () => {
    const [counterDown, setCounterDown] = useState(0)
    const [counterUp, setCounterUp] = useState(0)
    const handleCounterDown = () => {
        setCounterDown(counterDown + 1)
    }
    const handleCounterUp = () => {
        setCounterUp(counterUp + 1)
    }
    return (
        <div>
            <button className="up" onClick={handleCounterUp}>
                <img className="tumb-up" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg">
                </img>{counterUp}
            </button>
            <button className="down" onClick={handleCounterDown}>
                <img className="tumb-down" src="https://icon-library.com/images/white-thumbs-up-icon/white-thumbs-up-icon-26.jpg"></img>
                <span>{counterDown}</span>
            </button>
        </div>
    )
}
export default Counter