import React from 'react';
import { useGlobalContext } from "../Context"




const SearchBox = () => {

    const { keyword, setKeyword } = useGlobalContext();
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };


    function handleChange(event) {
        setKeyword(event.target.value)  
    }


    return (
        <div>
            <input
                style={BarStyling}
                key="random1"
                value={keyword}
                placeholder={"search"}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchBox