import Videos from "./Videos.js";

function Map({ videoData, setVideoData, sort })
{
    const sortedData = videoData.sort((a, b) => sort === "asc" ? a.rating - b.rating : b.rating - a.rating)
    return (
        <div className="sortChange">
            {sortedData.map((video, key) =>
                <Videos data={videoData} setVideoData={setVideoData} video={video} key={key} />)
            }
        </div>
    );
}

export default Map;