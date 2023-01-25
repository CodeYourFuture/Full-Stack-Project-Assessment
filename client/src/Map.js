import Videos from "./Videos.js";

function Map({ videoData, setVideoData, sort })
{
    const mappingData = (videoData) => 
    {
        if (sort === "?order=asc")
        {
            [...videoData].sort((a, b) => a.rating - b.rating);
            return (

                videoData.map((video, key) =>
                (
                    <Videos data={videoData} setVideoData={setVideoData} video={video} key={key} />
                )))
        }

        else if (sort === "?order=desc")
        {
            [...videoData].sort((a, b) => b.rating - a.rating);
            return (

                videoData.map((video, key) =>
                (
                    <Videos data={videoData} setVideoData={setVideoData} video={video} key={key} />
                )))
        }

    }

    return (
        <div className="sortChange">
            {mappingData(videoData)}
        </div>
    );
}

export default Map;