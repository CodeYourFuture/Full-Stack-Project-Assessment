import { useState } from "react"
import VideoCard from "./VideoCard"


const CardHolder = ({ allMyVideos, setAllMyVideos }) => {
    const [sorting, setSorting] = useState("asc")

    const handleSortingButton = () => {
        if (sorting === "asc") {
            let sortingAscVideos = allMyVideos.sort(function (a, b) {
                return a.rating - b.rating
            })
            setAllMyVideos(sortingAscVideos)
            setSorting("dsc")
        } else if (sorting === "dsc") {
            let sortingDscVideos = allMyVideos.sort(function (a, b) {
                return b.rating - a.rating
            })
            setAllMyVideos(sortingDscVideos)
            setSorting("asc")
        }
    }

    return (
        <div>
            <div className="sorting-holder">
                Sort
                <button className="sorting-ratings-button" onClick={handleSortingButton}>
                    <img alt="arrowImage" src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/sort-arrows-icon.png" style={{ width: "0.6rem" }}>
                    </img>
                </button>
            </div>
            <div className="cards-holder">
                <VideoCard allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
            </div>
            <div style={{ height: "60px", width: "100%", color: "white" }}>
                ©Olha Danylevska
            </div>
        </div>

    )
}

export default CardHolder