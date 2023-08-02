import VideoCard from "./VideoCard"


const CardHolder = ({ allMyVideos, setAllMyVideos }) => {
    return (
        <div className="cards-holder">
            <VideoCard allMyVideos={allMyVideos} setAllMyVideos={setAllMyVideos} />
        </div>
    )
}

export default CardHolder