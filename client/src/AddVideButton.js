import { useState } from "react"
import AddingVideo from "./AddingVideo";


const AddVideoButton = ({ allMyViveos, setAllMyVideos }) => {
    const [pressedButton, setPressedButton] = useState(false)
    const [buttonLable, setButtonLable] = useState("ADD YOUR VIDEO")
    const handleClick = () => {
        if (!pressedButton) {
            setPressedButton(true)
            setButtonLable("CLOSE")
        } else if (pressedButton) {
            setPressedButton(false)
            setButtonLable("ADD YOUR VIDEO")
        }
    }
    return (
        <div>
            <button className="main-button-to-add" onClick={handleClick}>{buttonLable}</button>
            {pressedButton && <AddingVideo allMyViveos={allMyViveos} setAllMyVideos={setAllMyVideos} />}
        </div>
    )
}

export default AddVideoButton