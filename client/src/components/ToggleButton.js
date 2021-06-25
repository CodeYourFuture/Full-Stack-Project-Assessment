import React, { useState } from "react"
import { useGlobalContext } from "../Context"


const ToggleButton = () => {

    const { handleClick } = useGlobalContext();

    return (
        <div>
            <button type="button" onClick={handleClick} class="btn btn-success">Toggle</button>
        </div>
    )

}

export default ToggleButton

